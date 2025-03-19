addLayer("e", {
    name: "export", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffffff",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "exports", // Name of prestige currency
    baseResource: "files", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have. custom: no description. none: no description.
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: Reset for exports", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
	11: {
	title: "Double File",
	description: "Double the files",
	cost: new Decimal(2),
	},
	12: {
	title: "SD",
	description: "Gain files.",
	cost: new Decimal(3),
	effect() {
                return player.points.add(1).pow(0.42)
	},
        effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
        tooltip: "(points+1)<sup>0.42</sup>",
	unlocked() { return hasUpgrade("e", 11) }
	}
    }
})
