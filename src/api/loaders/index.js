const { indexBy, prop, groupBy } = require('ramda')
const { userRepo } = require('../../data-access/repos')
const { makeEventOwnersLoader } = require('./user-loaders')

/**
 * Transform a list of DB results for Dataloader -> respects order.
 * If entity does not exist, null is returned because we expect 1:1 relationship.
 * @param {array} ids array of ids -> Dataloader instance input
 * @param {array} entities array of already fetched DB entities
 * @param {string} propName property used as a foreign key to map -> should match what "ids" are
 * @returns {array} sorted result
 */
const transformOneToOne = (ids, entities, propName) => {
  if (entities.some(entity => !entity[propName])) {
    throw new Error(`Cannot transform, entity is missing ${propName}`)
  }
  const indexed = indexBy(prop(propName), entities)
  return ids.map(id => (indexed[id] ? indexed[id] : null))
}

/**
 * Transform a list of DB results for Dataloader -> respects order.
 * If entity does not exist, empty array is returned because we expect 1:n relationship.
 * @param {array} ids array of ids -> Dataloader instance input
 * @param {array} entities array of already fetched DB entities
 * @param {string} propName property used as a foreign key to map -> should match what "ids" are
 * @returns {[[]]} sorted array of arrays of results mapped to each input id/key
 */
const transformOneToMany = (ids, entities, propName) => {
  if (entities.some(entity => !entity[propName])) {
    throw new Error(`Cannot transform, entity is missing ${propName}`)
  }
  const indexed = groupBy(prop(propName), entities)
  return ids.map(id => (indexed[id] ? indexed[id] : []))
}

const initLoaders = () => ({
  user: {
    eventOwnersLoader: makeEventOwnersLoader({
      findAllByIds: userRepo.findAllByIds,
      transform: transformOneToOne,
    }),
  },
})

module.exports = {
  initLoaders,
}
