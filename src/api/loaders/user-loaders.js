// this is actually a "simple" operation. We could consider moving it there
// and following the injection pattern -> repos should be injected
const Dataloader = require('dataloader')

const makeEventOwnersLoader = ({ findAllByIds, transform }) =>
  new Dataloader(
    async ownerIds => {
      const owners = await findAllByIds(ownerIds)
      return transform(ownerIds, owners, 'id')
    },
    { cache: true },
  )

module.exports = {
  makeEventOwnersLoader,
}
