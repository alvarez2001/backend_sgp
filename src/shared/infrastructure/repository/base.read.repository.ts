import { FilterQuery, Model, SortOrder } from 'mongoose';
import { SearchCriteriaDto } from '../../interfaces/search-criteria.dto';
import { PaginateResponseDto } from '../../interfaces/paginate-response.dto';

export abstract class BaseReadRepository<T> {
    async findByCriteria(
        model: Model<T>,
        criteria: SearchCriteriaDto,
    ): Promise<PaginateResponseDto<T>> {
        const { sort, page = 1, limit = 10, ...filters } = criteria;
        const queryObject = this.buildQueryObject(filters);
        const sortObject = this.parseSortCriteria(sort);

        const skip = (page - 1) * limit;
        const total = await model.countDocuments(queryObject);
        const data = await model.find(queryObject).sort(sortObject).skip(skip).limit(limit).exec();

        const queryData: object = JSON.parse(
            JSON.stringify(queryObject, (key, value) => {
                if (value instanceof RegExp) {
                    return { pattern: value.source, flags: value.flags };
                }
                return value;
            }),
        );

        return {
            data,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            query: queryData,
            sort: sortObject,
        };
    }

    private buildQueryObject(filters: {
        [key: string]: string | string[] | number | number[];
    }): FilterQuery<T> {
        return Object.keys(filters).reduce((query, key) => {
            const value = filters[key];
            const baseKey = key.replace(/(Start|End)$/, '');
            const operator = key.endsWith('Start') ? '$gte' : key.endsWith('End') ? '$lte' : null;

            if (operator) {
                query[baseKey] = { ...query[baseKey], [operator]: value };
            } else if (key.endsWith('Array')) {
                query[key] = {
                    $in: String(value)
                        .split(',')
                        .map(valueData => {
                            if (this.isNumberValid(Number(valueData))) {
                                return parseFloat(valueData);
                            }

                            return valueData;
                        }),
                };
            } else {
                query[key] = new RegExp(String(value), 'i');
            }

            return query;
        }, {});
    }

    private parseSortCriteria(sort?: string): { [key: string]: SortOrder } {
        const sortObject = {};
        if (sort) {
            sort.split(',').forEach(part => {
                const direction = part.startsWith('-') ? -1 : 1;
                const key = part.startsWith('-') ? part.substring(1) : part;
                sortObject[key] = direction;
            });
        }
        return sortObject;
    }

    private isNumberValid(value: number | string): boolean {
        return typeof value === 'number' && isFinite(value) && !Number.isNaN(value);
    }
}
