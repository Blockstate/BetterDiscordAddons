//META{"name":"FixGermanTranslation"}*//

class FixGermanTranslation {
	constructor () {
		this.serverContextObserver = new MutationObserver(() => {});
	}

	getName () {return "FixGermanTranslation";}

	getDescription () {return "Fixes some german translation errors.";}

	getVersion () {return "1.1.0";}

	getAuthor () {return "DevilBro";}

	//legacy
	load () {}

	unload () {}

	start () {
		if ($('head script[src="https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDfunctionsDevilBro.js"]').length == 0) {
			$('head').append("<script src='https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDfunctionsDevilBro.js'></script>");
		}
		if (typeof BDfunctionsDevilBro === "object") {
			setTimeout(() => {
				if (BDfunctionsDevilBro.getDiscordLanguage().id == "de") {
					this.serverContextObserver = new MutationObserver((changes, _) => {
						changes.forEach(
							(change, i) => {
								if (change.addedNodes) {
									change.addedNodes.forEach((node) => {
										if (node.nodeType == 1 && node.className.includes("context-menu")) {
											this.onContextMenu(node);
										}
									});
								}
							}
						);
					});
					this.serverContextObserver.observe($(".tooltips").parent()[0], {childList: true});
				}
				BDfunctionsDevilBro.loadMessage(this.getName(), this.getVersion());
			},5000);
		}
		else {
			BDfunctionsDevilBro.fatalMessage(this.getName());
		}
	}

	stop () {
		this.serverContextObserver.disconnect();
	}

	
	// begin of own functions
	
	onContextMenu (context) {
		var serverData = BDfunctionsDevilBro.getKeyInformation({"node":context, "key":"guild"});
		var contextType = BDfunctionsDevilBro.getKeyInformation({"node":context, "key":"displayName", "value":"GuildLeaveGroup"});
		
		if (serverData && contextType) {
			var allLabels = Array.from(context.getElementsByClassName("label"));
			allLabels.forEach(
				(label) => {
					if (label.innerText.indexOf("Serverweit Mikrofone deaktivieren") != -1) {
						label.innerText = "Server stummschalten";
					}
					if (label.innerText.indexOf("Hide Muted Channels") != -1) {
						label.innerText = "Verstecke stumme Kanäle";
					}
				}
			);
		}
	}
}