// this is actually a "simple" operation. We could consider moving it there
// and following the injection pattern -> repos should be injected
import * as Dataloader from 'dataloader'

export const makeEventOwnersLoader = ({ findAllByIds, transform }) =>
  new Dataloader(
    async ownerIds => {
      const owners = await findAllByIds(ownerIds)
      return transform(ownerIds, owners, 'id')
    },
    { cache: true },
  )
