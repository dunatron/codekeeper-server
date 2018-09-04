function samples(parent, args, context, info) {
  return context.db.query.samples({ where: { id_in: parent.sampleIds } }, info)
}

module.exports = {
  samples,
}
