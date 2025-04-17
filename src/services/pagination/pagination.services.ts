import { SelectQueryBuilder, ObjectLiteral } from 'typeorm'

interface PaginateOptions {
  page: number
  limitPerPage: number
  all?: boolean
}

export async function paginate<T extends ObjectLiteral>(
  query: SelectQueryBuilder<T>,
  options: PaginateOptions,
  meta: Record<string, any> = {}
) {
  if (!query) {
    return {
      data: [],
      meta: {
        totalItems: 0,
        itemsPerPage: options.limitPerPage,
        currentPage: options.page,
        totalPages: 0,
        ...meta,
      },
    }
  }

  if (!options.all) {
    const skip = (options.page - 1) * options.limitPerPage
    query.take(options.limitPerPage).skip(skip)
  }

  const [result, totalItems] = await query.getManyAndCount()
  const totalPages = Math.ceil(totalItems / options.limitPerPage)

  const paginationMeta = options.all
    ? { totalItems, ...meta }
    : {
        totalItems,
        itemsPerPage: options.limitPerPage,
        totalPages,
        currentPage: options.page,
        ...meta,
      }

  return {
    data: result,
    meta: paginationMeta,
  }
}
