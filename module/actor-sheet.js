/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class IronswornActorSheet extends ActorSheet {
  /** @override */
  static get defaultOptions () {
    return mergeObject(super.defaultOptions, {
      classes: ['ironsworn', 'sheet', 'actor'],
      width: 1000,
      height: 800,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'description'
        }
      ],
      dragDrop: [{ dragSelector: '.item-list .item', dropSelector: null }]
    })
  }

  /** @override */
  get template () {
    const path = 'systems/foundry-ironsworn/templates/actor'
    return `${path}/${this.actor.data.type}.html`
  }

  /* -------------------------------------------- */

  /** @override */
  getData () {
    const data = super.getData()
    data.dtypes = ['String', 'Number', 'Boolean']
    return data
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners (html) {
    super.activateListeners(html)

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return

    // Enable rolling stats
    html.find('.stat.clickable').click(this._rollStat.bind(this))

    // Update Inventory Item
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents('.item')
      const item = this.actor.getOwnedItem(li.data('itemId'))
      item.sheet.render(true)
    })

    // Delete Inventory Item
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents('.item')
      this.actor.deleteOwnedItem(li.data('itemId'))
      li.slideUp(200, () => this.render(false))
    })
  }

  _rollStat (event) {
    event.preventDefault()

    const el = event.currentTarget
    const stat = el.dataset.stat
    const label = `Roll +${stat}`
    game.ironswornMoveRoll(`@${stat}`, this.actor.data.data, label)
  }
}
