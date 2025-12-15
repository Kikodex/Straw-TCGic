import { Injectable } from "@angular/core";
import { Leader } from '../models/deck.model';

@Injectable({
  providedIn: 'root'
})
export class LeadersService {


  getLeaders(): Leader[] {
    return [
        {
            "id": "EB01-001",
            "code": "EB01-001",
            "rarity": "L",
            "type": "LEADER",
            "name": "Kouzuki Oden",
            "images": {
                "small": "https://en.onepiece-cardgame.com/images/cardlist/card/EB01-001.png?240831",
                "large": "https://en.onepiece-cardgame.com/images/cardlist/card/EB01-001.png?240831"
            },
            "cost": 4,
            "attribute": {
                "name": "Slash",
                "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
            },
            "power": 5000,
            "counter": "-",
            "color": "Red/Green",
            "family": "Land of Wano/Kouzuki Clan",
            "ability": "All of your {Land of Wano} type Character cards without aCounter have a +1000 Counter, according to the rules.<br>[DON!!x1] [When Attacking] If you have a {Land of Wano} typeCharacter with a cost of 5 or more, this Leader gains +1000power until the start of your next turn.",
            "trigger": "",
            "set": {
                "name": "-Memorial Collection- [EB-01]"
            },
            "notes": []
        },
        {
            "id": "EB01-021",
            "code": "EB01-021",
            "rarity": "L",
            "type": "LEADER",
            "name": "Hannyabal",
            "images": {
                "small": "https://en.onepiece-cardgame.com/images/cardlist/card/EB01-021.png?240831",
                "large": "https://en.onepiece-cardgame.com/images/cardlist/card/EB01-021.png?240831"
            },
            "cost": 4,
            "attribute": {
                "name": "Slash",
                "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
            },
            "power": 5000,
            "counter": "-",
            "color": "Blue/Purple",
            "family": "Impel Down",
            "ability": "[End of Your Turn] You may return 1 of your {Impel Down}type Characters with a cost of 2 or more to the owner'shand: Add up to 1 DON!! card from your DON!! deck and set itas active.",
            "trigger": "",
            "set": {
                "name": "-Memorial Collection- [EB-01]"
            },
            "notes": []
        },
        {
            "id": "EB01-040",
            "code": "EB01-040",
            "rarity": "L",
            "type": "LEADER",
            "name": "Kyros",
            "images": {
                "small": "https://en.onepiece-cardgame.com/images/cardlist/card/EB01-040.png?240831",
                "large": "https://en.onepiece-cardgame.com/images/cardlist/card/EB01-040.png?240831"
            },
            "cost": 4,
            "attribute": {
                "name": "Slash",
                "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
            },
            "power": 5000,
            "counter": "-",
            "color": "Black/Yellow",
            "family": "Dressrosa",
            "ability": "[Activate: Main] [Once Per Turn] You may turn 1 card fromthe top of your Life cards face-up: K.O. up to 1 of youropponent's Characters with a cost of 0.",
            "trigger": "",
            "set": {
                "name": "-Memorial Collection- [EB-01]"
            },
            "notes": []
        },
        {
            "id": "OP05-060_p3",
            "code": "OP05-060",
            "rarity": "L",
            "type": "LEADER",
            "name": "Monkey.D.Luffy",
            "images": {
                "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP05-060_p3.png?241220",
                "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP05-060_p3.png?241220"
            },
            "cost": 5,
            "attribute": {
                "name": "Strike",
                "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type01.png"
            },
            "power": 5000,
            "counter": "-",
            "color": "Purple",
            "family": "Straw Hat Crew",
            "ability": "[Activate: Main] [Once Per Turn] You may add 1 card from the\n                    top of your Life cards to your hand: If you have 0 or 3 or\n                    more DON!! cards on your field, add up to 1 DON!! card from\n                    your DON!! deck and set it as active.",
            "trigger": "",
            "set": {
                "name": "-Purple Monkey.D.Luffy- [ST-18]"
            },
            "notes": []
        },
        {
            "id": "OP09-081_p2",
            "code": "OP09-081",
            "rarity": "L",
            "type": "LEADER",
            "name": "Marshall.D.Teach",
            "images": {
                "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP09-081_p2.png?250530",
                "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP09-081_p2.png?250530"
            },
            "cost": 5,
            "attribute": {
                "name": "Special",
                "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type03.png"
            },
            "power": 5000,
            "counter": "-",
            "color": "Black",
            "family": "The Four Emperors/Blackbeard Pirates",
            "ability": "Your [On Play] effects are negated.<br>[Activate: Main] You may trash 1 card from your hand: Your opponent's [On Play] effects are negated until the end of your opponent's next turn.",
            "trigger": "",
            "set": {
                "name": "-BLACK Marshall.D.Teach- [ST-27]"
            },
            "notes": []
        },
        {
            "id": "OP02-093_p2",
            "code": "OP02-093",
            "rarity": "L",
            "type": "LEADER",
            "name": "Smoker",
            "images": {
                "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP02-093_p2.png?241220",
                "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP02-093_p2.png?241220"
            },
            "cost": 5,
            "attribute": {
                "name": "Special",
                "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type03.png"
            },
            "power": 5000,
            "counter": "-",
            "color": "Black",
            "family": "Navy",
            "ability": "[DON!! x1] [Activate: Main] [Once Per Turn] Give up to 1 of your opponent's Characters −1 cost during this turn. Then, if there is a Character with a cost of 0, this Leader gains +1000 power during this turn.",
            "trigger": "",
            "set": {
                "name": "-Black Smoker- [ST-19]"
            },
            "notes": []
        },
        {
            "id": "OP09-001_p2",
            "code": "OP09-001",
            "rarity": "L",
            "type": "LEADER",
            "name": "Shanks",
            "images": {
                "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP09-001_p2.png?250530",
                "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP09-001_p2.png?250530"
            },
            "cost": 5,
            "attribute": {
                "name": "Slash",
                "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
            },
            "power": 5000,
            "counter": "-",
            "color": "Red",
            "family": "The Four Emperors/Red-Haired Pirates",
            "ability": "[Once Per Turn] This effect can be activated when your opponent attacks. Give up to 1 of your opponent's Leader or Character cards −1000 power during this turn.",
            "trigger": "",
            "set": {
                "name": "-RED Shanks- [ST-23]"
            },
            "notes": []
        },
        {
            "id": "OP03-099_p2",
            "code": "OP03-099",
            "rarity": "L",
            "type": "LEADER",
            "name": "Charlotte Katakuri",
            "images": {
                "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP03-099_p2.png?241220",
                "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP03-099_p2.png?241220"
            },
            "cost": 5,
            "attribute": {
                "name": "Strike",
                "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type01.png"
            },
            "power": 5000,
            "counter": "-",
            "color": "Yellow",
            "family": "Big Mom Pirates",
            "ability": "[DON!! x1] [When Attacking] Look at up to 1 card from the\n                    top of your or your opponent's Life cards, and place it at\n                    the top or bottom of the Life cards. Then, this Leader gains\n                    +1000 power during this battle.",
            "trigger": "",
            "set": {
                "name": "-Yellow Charlotte Katakuri- [ST-20]"
            },
            "notes": []
        },
        {
            "id": "OP09-042_p2",
            "code": "OP09-042",
            "rarity": "L",
            "type": "LEADER",
            "name": "Buggy",
            "images": {
                "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP09-042_p2.png?250530",
                "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP09-042_p2.png?250530"
            },
            "cost": 5,
            "attribute": {
                "name": "Slash",
                "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type02.png"
            },
            "power": 5000,
            "counter": "-",
            "color": "Blue",
            "family": "The Four Emperors/Cross Guild",
            "ability": "[Activate: Main] You may rest 5 of your DON!! cards and trash 1 card from your hand: Play up to 1 {Cross Guild} type Character card from your hand.",
            "trigger": "",
            "set": {
                "name": "-BLUE Buggy- [ST-25]"
            },
            "notes": []
        },
        {
            "id": "OP02-001_p2",
            "code": "OP02-001",
            "rarity": "L",
            "type": "LEADER",
            "name": "Edward.Newgate",
            "images": {
                "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP02-001_p2.png?241220",
                "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP02-001_p2.png?241220"
            },
            "cost": 6,
            "attribute": {
                "name": "Special",
                "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type03.png"
            },
            "power": 6000,
            "counter": "-",
            "color": "Red",
            "family": "The Four Emperors/Whitebeard Pirates",
            "ability": "[End of Your Turn] Add 1 card from the top of your Life\n                    cards to your hand.",
            "trigger": "",
            "set": {
                "name": "-Red Edward.Newgate- [ST-15]"
            },
            "notes": []
        },
        {
            "id": "OP07-019_p3",
            "code": "OP07-019",
            "rarity": "L",
            "type": "LEADER",
            "name": "Jewelry Bonney",
            "images": {
                "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP07-019_p3.png?250530",
                "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP07-019_p3.png?250530"
            },
            "cost": 5,
            "attribute": {
                "name": "Special",
                "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type03.png"
            },
            "power": 5000,
            "counter": "-",
            "color": "Green",
            "family": "Supernovas/Bonney Pirates",
            "ability": "[On Your Opponent's Attack] [Once Per Turn] You may rest 1 of your DON!! cards: Rest up to 1 of your opponent's Leader or Character cards.",
            "trigger": "",
            "set": {
                "name": "-GREEN Jewelry Bonney- [ST-24]"
            },
            "notes": []
        },
        {
            "id": "OP06-022_p3",
            "code": "OP06-022",
            "rarity": "L",
            "type": "LEADER",
            "name": "Yamato",
            "images": {
                "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP06-022_p3.png?250530",
                "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP06-022_p3.png?250530"
            },
            "cost": 4,
            "attribute": {
                "name": "Strike",
                "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type01.png"
            },
            "power": 5000,
            "counter": "-",
            "color": "Green/Yellow",
            "family": "Land of Wano",
            "ability": "[Double Attack] (This card deals 2 damage.)<br>[Activate: Main] [Once Per Turn] If your opponent has 3 or less Life cards, give up to 2 rested DON!! cards to 1 of your Characters.",
            "trigger": "",
            "set": {
                "name": "-GREEN/YELLOW Yamato- [ST-28]"
            },
            "notes": []
        },
        {
            "id": "OP09-061_p2",
            "code": "OP09-061",
            "rarity": "L",
            "type": "LEADER",
            "name": "Monkey.D.Luffy",
            "images": {
                "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP09-061_p2.png?250530",
                "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP09-061_p2.png?250530"
            },
            "cost": 4,
            "attribute": {
                "name": "Strike",
                "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type01.png"
            },
            "power": 5000,
            "counter": "-",
            "color": "Purple/Black",
            "family": "The Four Emperors/Straw Hat Crew",
            "ability": "[DON!! x1] All of your Characters gain +1 cost.<br>[Your Turn] [Once Per Turn] When 2 or more DON!! cards on your field are returned to your DON!! deck, add up to 1 DON!! card from your DON!! deck and set it as active, and add up to 1 additional DON!! card and rest it.",
            "trigger": "",
            "set": {
                "name": "-PURPLE/BLACK Monkey.D.Luffy- [ST-26]"
            },
            "notes": []
        },
        {
            "id": "OP01-060_p2",
            "code": "OP01-060",
            "rarity": "L",
            "type": "LEADER",
            "name": "Donquixote Doflamingo",
            "images": {
                "small": "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-060_p2.png?241220",
                "large": "https://en.onepiece-cardgame.com/images/cardlist/card/OP01-060_p2.png?241220"
            },
            "cost": 5,
            "attribute": {
                "name": "Special",
                "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type03.png"
            },
            "power": 5000,
            "counter": "-",
            "color": "Blue",
            "family": "The Seven Warlords of the Sea/Donquixote Pirates",
            "ability": "[DON!! x2] [When Attacking] ➀ (You may rest the specified number of DON!! cards in your cost area.): Reveal 1 card from the top of your deck. If that card is a {The Seven Warlords of the Sea} type Character card with a cost of 4 or less, you may play that card rested.",
            "trigger": "",
            "set": {
                "name": "-Blue Donquixote Doflamingo- [ST-17]"
            },
            "notes": []
        },
        {
            "id": "ST14-001",
            "code": "ST14-001",
            "rarity": "L",
            "type": "LEADER",
            "name": "Monkey.D.Luffy",
            "images": {
                "small": "https://en.onepiece-cardgame.com/images/cardlist/card/ST14-001.png?241220",
                "large": "https://en.onepiece-cardgame.com/images/cardlist/card/ST14-001.png?241220"
            },
            "cost": 5,
            "attribute": {
                "name": "Strike",
                "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type01.png"
            },
            "power": 5000,
            "counter": "-",
            "color": "Black",
            "family": "Straw Hat Crew",
            "ability": "[DON!! x1] All of your Characters gain +1 cost. If you have a Character with a cost of 8 or more, this Leader gains +1000 power.",
            "trigger": "",
            "set": {
                "name": "-3D2Y- [ST-14]"
            },
            "notes": []
        },
        {
            "id": "ST21-001",
            "code": "ST21-001",
            "rarity": "L",
            "type": "LEADER",
            "name": "Monkey.D.Luffy",
            "images": {
                "small": "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-001.png?250530",
                "large": "https://en.onepiece-cardgame.com/images/cardlist/card/ST21-001.png?250530"
            },
            "cost": 5,
            "attribute": {
                "name": "Strike",
                "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type01.png"
            },
            "power": 5000,
            "counter": "-",
            "color": "Red",
            "family": "The Four Emperors/Straw Hat Crew",
            "ability": "[DON!! x1] [Activate: Main] [Once Per Turn] Give up to 2 rested DON!! cards to 1 of your Characters.",
            "trigger": "",
            "set": {
                "name": "-GEAR5- [ST-21]"
            },
            "notes": []
        },
        {
            "id": "ST13-001",
            "code": "ST13-001",
            "rarity": "L",
            "type": "LEADER",
            "name": "Sabo",
            "images": {
                "small": "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-001.png?241220",
                "large": "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-001.png?241220"
            },
            "cost": 4,
            "attribute": {
                "name": "Special",
                "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type03.png"
            },
            "power": 5000,
            "counter": "-",
            "color": "Red/Yellow",
            "family": "Dressrosa/Revolutionary Army",
            "ability": "[DON!! x1] [Activate: Main] [Once Per Turn] You may add 1 of your Characters with a cost of 3 or more and 7000 power or more to the top of your Life cards face-up: Up to 1 of your Characters gains +2000 power until the start of your next turn.",
            "trigger": "",
            "set": {
                "name": "-The Three Brothers-[ST13]"
            },
            "notes": []
        },
        {
            "id": "ST13-002",
            "code": "ST13-002",
            "rarity": "L",
            "type": "LEADER",
            "name": "Portgas.D.Ace",
            "images": {
                "small": "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-002.png?241220",
                "large": "https://en.onepiece-cardgame.com/images/cardlist/card/ST13-002.png?241220"
            },
            "cost": 4,
            "attribute": {
                "name": "Special",
                "image": "https://en.onepiece-cardgame.com/images/cardlist/attribute/ico_type03.png"
            },
            "power": 5000,
            "counter": "-",
            "color": "Blue/Yellow",
            "family": "Whitebeard Pirates",
            "ability": "[DON!! x2] [Activate: Main] [Once Per Turn] Look at 5 cards from the top of your deck and add up to 1 Character card with a cost of 5 to the top of your Life cards face-up. Then, place the rest at the bottom of your deck in any order.<br>[End of Your Turn] Trash all your face-up Life cards.",
            "trigger": "",
            "set": {
                "name": "-The Three Brothers-[ST13]"
            },
            "notes": []
        }
    ];
  }
}
