const state = {
	conversions:{
		"retropie":{
			"friendlyName":"RetroPie"
		},
		"copy":{
			"friendlyName":"Straight Copy"
		},
		"launchbox":{
			"friendlyName":"LaunchBox"
		}
	},

	conversionMatrix:{
		"retropie":{
			"Arcade":"mame",
			"Atari 2600":"atari2600",
			"Atari 5200":"atari5200",
			"Atari 7800":"atari7800",
			"Atari Jaguar":"atarijaguar",
			"Atari Jaguar CD":"atarijaguarcd",
			"ColecoVision":"colecovision",
			"Commodore Amiga":"amiga",
			"GCE Vectrex":"vectrex",
			"Mattel Intellivision":"intellivision",
			"NEC TurboGrafx-16":"pcengine",
			"NEC TurboGrafx-CD":"",
			"Nintendo 64":"n64",
			"Nintendo Entertainment System":"nes",
			"Nintendo Game Boy":"gb",
			"Nintendo Game Boy Advance":"gba",
			"Nintendo Game Boy Color":"gbc",
			"Nintendo GameCube":"gc",
			"Nintendo Wii":"wii",
			"Sega 32X":"sega32x",
			"Sega CD":"segacd",
			"Sega Dreamcast":"dreamcast",
			"Sega Game Gear":"gamegear",
			"Sega Genesis":"megadrive",
			"Sega Master System":"mastersystem",
			"Sega Saturn":"saturn",
			"SNK Neo Geo Pocket Color":"ngp",
			"SNK Neo Geo Pocket Color":"ngpc",
			"Sony Playstation":"psx",
			"Sony Playstation 2":"ps2",
			"Sony PSP":"psp",
			"Super Nintendo Entertainment System":"snes",
			"Amstrad CPC":"amstradcpc",
			"Apple 2":"apple2",
			"Atari 800":"",
			"Atari ST":"atarist",
			"Atari Falcon":"atarifalcon",
			"Atari XE":"atarixe",
			"Commodore 64":"c64",
			"Amstrad CPC":"amstradcpc",
			"Final Burn Alpha":"fba",
			"Apple Macintosh":"macintosh",
			"DOS":"pc",
			"ScummVM":"scummvm",
			"ZX Spectrum":"zxspectrum",
		}
	}
}

const mutations = {

}

const actions = {

}

const getters = {
	conversions: state => {
		return state.conversions
	},

	conversionMatrices: state => {
		return state.conversionMatrix
	},
	
	conversionMatrix: (state) => (searchName) =>{
		return state.conversionMatrix.find(list => conversionMatrix.name === searchName);
	},
}

export default {
state,
mutations,
actions,
getters
}
