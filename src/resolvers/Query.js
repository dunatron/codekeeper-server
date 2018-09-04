async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [
          { url_contains: args.filter },
          { description_contains: args.filter },
        ],
      }
    : {}

  // 1
  const queriedSamples = await context.db.query.samples(
    { where, skip: args.skip, first: args.first, orderBy: args.orderBy },
    `{ id }`
  )

  // 2
  const countSelectionSet = `
    {
      aggregate {
        count
      }
    }
  `

  const samplesConnection = await context.db.query.samplesConnection(
    {},
    countSelectionSet
  )

  // 3
  return {
    count: samplesConnection.aggregate.count,
    sampleIds: queriedSamples.map(sample => sample.id),
  }
}

function info(parent, args, context, info) {
  return "I am Code Keeper. A tool to help store those snippets for later"
}

module.exports = {
  feed,
  info,
}
