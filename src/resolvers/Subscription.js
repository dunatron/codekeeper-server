function newSampleSubscribe(parent, args, context, info) {
  return context.db.subscription.sample(
    { where: { mutation_in: ["CREATED"] } },
    info
  )
}

function newVoteSubscribe(parent, args, context, info) {
  return context.db.subscription.vote(
    { where: { mutation_in: ["CREATED"] } },
    info
  )
}

const newVote = {
  subscribe: newVoteSubscribe,
}

const newSample = {
  subscribe: newSampleSubscribe,
}

module.exports = {
  newSample,
  newVote,
}
