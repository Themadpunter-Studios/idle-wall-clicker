(function(Scratch) {
  'use strict';
  var script = document.createElement('script');
  script.src = 'https://sdk.crazygames.com/crazygames-sdk-v3.js';
	document.head.appendChild(script);
  // Initialize the CrazyGames SDK asynchronously
  

  class CrazyGamesSDKv3 {
    getInfo() {
      return {
        id: 'crazygamessdkv3',
        name: 'CrazyGames SDK v3',
		color1: "#6815cf",
		color2: "#4f1299",
        blocks: [
		{
            blockType: Scratch.BlockType.LABEL,
            text: 'Basic Blocks'
        },
		{
			opcode: 'initCrazyGamesSDK',
			blockType: Scratch.BlockType.COMMAND,
			text: 'Initialize SDK'
		},
        {
            opcode: 'getEnvironment',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Get Enviroment'
        },
		'---',
		{
            blockType: Scratch.BlockType.LABEL,
            text: 'Ads'
        },
		{
			opcode: 'requestAd',
			blockType: Scratch.BlockType.COMMAND,
			text: 'Request Ad [TYPE]',
			arguments: {
				TYPE: {
					type: Scratch.ArgumentType.STRING,
					menu: 'AD_TYPES'
				}
			}
		},
		{
            blockType: Scratch.BlockType.EVENT,
            opcode: 'adEnds',
            text: 'When Ad Ends',
            isEdgeActivated: false // required boilerplate
        },
		{
            blockType: Scratch.BlockType.EVENT,
            opcode: 'adError',
            text: 'When Ad Errors',
            isEdgeActivated: false // required boilerplate
        },
		{
            blockType: Scratch.BlockType.EVENT,
            opcode: 'adStarts',
            text: 'When Ad Starts',
            isEdgeActivated: false // required boilerplate
        },
		'---',
		{
            blockType: Scratch.BlockType.LABEL,
            text: 'Game Blocks'
        },
		{
			blockType: Scratch.BlockType.COMMAND,
			opcode: 'celebrate',
			text: 'Celebrate'
		},
		{
			opcode: 'startGameplay',
			blockType: Scratch.BlockType.COMMAND,
			text: "Start Gameplay"
		},
		{
			opcode: 'endGameplay',
			blockType: Scratch.BlockType.COMMAND,
			text: "End Gameplay"
		},
		{
			opcode: 'inviteLink',
			blockType: Scratch.BlockType.REPORTER,
			text: 'Create invite link with parameters [DATA]',
			arguments: {
				DATA: {
					type: Scratch.ArgumentType.STRING
				}
			}
		},
		{
			opcode: 'showInviteButton',
			blockType: Scratch.BlockType.REPORTER,
			text: 'Create invite button with parameters [DATA]',
			arguments: {
				DATA: {
					type: Scratch.ArgumentType.STRING
				}
			}
		},
		{
			opcode: "hideInviteButton",
			blockType: Scratch.BlockType.COMMAND,
			text: "Hide Invite Button"
		},
		{
			opcode: "getInviteParams",
			blockType: Scratch.BlockType.REPORTER,
			text: "Get Invite Data"
		},
		
		"---",
		{
            blockType: Scratch.BlockType.LABEL,
            text: 'User Blocks'
        },
		{
			blockType: Scratch.BlockType.BOOLEAN,
			opcode: 'usersAvailable',
			text: 'User Login Available?',
          disableMonitor: true
		},
		{
			blockType: Scratch.BlockType.REPORTER,
			opcode: 'getLoggedInUser',
			text: 'Get Logged In User',
          disableMonitor: true
		},
		{
			blockType: Scratch.BlockType.REPORTER,
			opcode: 'getSystemInfo',
			text: 'Get System Info',
          disableMonitor: true
		},
		{
			blockType: Scratch.BlockType.REPORTER,
			opcode: 'authPrompt',
			text: 'Prompt Login',
          disableMonitor: true
		},
		{
			blockType: Scratch.BlockType.REPORTER,
			opcode: 'getToken',
			text: 'Get Token',
          disableMonitor: true
		}
        ],
        menus: {
			AD_TYPES: {
				acceptReporters: true,
				items: ['rewarded', 'midgame']
			}
		}
      };
    }
	async initCrazyGamesSDK() {
		
		await window.CrazyGames.SDK.init();


    }

    getEnvironment() {
      if (typeof window.CrazyGames !== 'undefined' && window.CrazyGames.SDK) {
        return window.CrazyGames.SDK.environment;
      }
      return 'SDK not initialized';
    }
	
	startGameplay() {
		window.CrazyGames.SDK.game.gameplayStart();
	}
	
	endGameplay() {
		window.CrazyGames.SDK.game.gameplayStop();
	}
	
	requestAd(args) {
		const callbacks = {
			adFinished: () => Scratch.vm.runtime.startHats('crazygamessdkv3_adEnds'),
			adError: (error) => Scratch.vm.runtime.startHats('crazygamessdkv3_adErrors'), 
			adStarted: () => Scratch.vm.runtime.startHats('crazygamessdkv3_adStarts'),
		};
		window.CrazyGames.SDK.ad.requestAd(args.TYPE, callbacks);
		
    }
	
	celebrate() {
		window.CrazyGames.SDK.game.happytime();
		
	}
	
	inviteLink(args) {
		try {
			return window.CrazyGames.SDK.game.inviteLink({"data": args.DATA});
		} catch (e) {
			return JSON.stringify(e)
		}
		
	}
	
	showInviteButton(args) {
		try {
			return window.CrazyGames.SDK.game.showInviteButton({"data": args.DATA});
		} catch (e) {
			return JSON.stringify(e)
		}
    }
	
	hideInviteButton() {
		try {
			window.CrazyGames.SDK.game.hideInviteButton();
		} catch (e) {
			return JSON.stringify(e)
		}
	}
	
	getInviteParams() {
		try {
			return window.CrazyGames.SDK.game.getInviteParam("data");
		} catch (e) {
			return JSON.stringify(e)
		}
	}
	usersAvailable() {
		try {
			return Scratch.Cast.toBoolean(window.CrazyGames.SDK.user.isUserAccountAvailable);
		} catch (e) {
			return JSON.stringify(e)
		}
	}
	
	async getLoggedInUser() {
		try {
			return JSON.stringify(await window.CrazyGames.SDK.user.getUser());
		} catch (e) {
			return JSON.stringify(e)
		}
	}
	
	async getSystemInfo() {
		try {
			return JSON.stringify(window.CrazyGames.SDK.user.systemInfo);
		} catch (e) {
			return JSON.stringify(e)
		}
		
		 
	}
	
	async authPrompt() {
		try {
			const user = await window.CrazyGames.SDK.user.showAuthPrompt();
			return JSON.stringify(user);
		} catch (e) {
			return JSON.stringify(e);
		}
	}
	
	async getToken() {
		try {
			const token = await window.CrazyGames.SDK.user.getUserToken();
			return JSON.stringify(token)
		} catch (e) {
			return JSON.stringify(e)
		}
	}
  }

  // Register the extension with Scratch
  Scratch.extensions.register(new CrazyGamesSDKv3());

})(Scratch);
