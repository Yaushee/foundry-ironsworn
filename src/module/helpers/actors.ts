import { IronswornActor } from '../actor/actor'

export function defaultActor(): IronswornActor {
  if (game.user?.character) return game.user.character

  // TODO: if more than one character, prompt the user
  const actor = game.actors?.find((x) => x.type === 'character')
  if (!actor) {
    ui.notifications?.error("Couldn't find a character for you")
    throw new Error("Couldn't find an actor")
  }
  return actor
}
