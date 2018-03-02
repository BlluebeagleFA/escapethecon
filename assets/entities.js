// Player template
Game.PlayerTemplate = {
    name: 'human (you)',
    character: '@',
//    foreground: 'white',
    maxHp: 40,
    attackValue: 10,
    sightRadius: 6,
    inventorySlots: 22,
    mixins: [Game.EntityMixins.PlayerActor,
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible,
             Game.EntityMixins.InventoryHolder, Game.EntityMixins.FoodConsumer,
             Game.EntityMixins.Sight, Game.EntityMixins.MessageRecipient,
             Game.EntityMixins.Equipper, Game.EntityMixins.BodyPartHaver,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.PlayerStatGainer,
             Game.EntityMixins.Corruptable]
};

// Create our central entity repository
Game.EntityRepository = new Game.Repository('entities', Game.Entity);

//Game.EntityRepository.define('puddle', {
//    name: 'puddle',
//    character: 'P',
//    foreground: 'pink',
//    maxHp: 10,
//    speed: 250,
//    mixins: [Game.EntityMixins.FungusActor, Game.EntityMixins.Destructible,
//             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
//});
//

Game.EntityRepository.define('rabbit', {
    name: 'rabbit',
    killMessage: 'The rabbit\'s kicks and strikes are too fast to follow, and you finally fall over, helpless and weakened by his attacks. He stands over you with a buck-toothed grin, and you expect him to fuck your mouth or ass like the other infected seem to want to. Instead, though, he lifts his long furry footpaw, and presses it slowly to your face. You feel the warm soft sole shove down on you, and his toes wriggle and stroke your head. He increases the pressure as he stands up and places his other foot on your crotch, where he rubs and massages your cock with his toes. Something seems to be happening in your head. The more you inhale his musk and scent, and feel his feet rub on you, the more you start to love it. Being underfoot is so hot. You want to serve and obey him. You rub and massage the foot on your face, nuzzling and kissing it eagerly. It doesn\'t take you long to whimper and cum, soaking your rabbit master\'s sole with jizz. You feel yourself blacking out, and you faint, your mind filled with thoughts of paws and feet.',
    attacks: {
		head : {
			attack: 'The rabbit bounces and moves so fast that you can barely follow his movements. Suddenly his long paw is against your foot and you\'re flat on your ass on the floor. Before you can get back up, you feel a warm and firm object as it presses down on your face. One of the rabbit\'s long and powerful footpaws is shoved down on your head, his toes wriggling against your forehead as his fluffy sole covers your mouth and nose. You feel your face pushing out into a short muzzle, and your jaw aching as you develop buck teeth. Your ears grow longer and furrier as they stretch out above your head.',
			description: "You have a furry rabbit head, with long brown ears and a twitching nose."
		},
		chest : {
			attack: 'The rabbit suddenly pounces on you from behind. His hands grip your shoulders as he straddles you, and his legs are at your sides. His long fluffy feet stroke and press on your chest as he teases you with his toes. You feel soft brown fur growing along your chest as you become shorter and the rabbit\'s infection spreads through you.',
			description: "You have a slender chest covered in soft silky brown and peach fur."
		},
		arms : {
			attack: 'The rabbit suddenly hops up on your shoulders, and his long footpaws scrabble at your arms. Where the claws in his fluffy feet scratch you, your skin starts to grow soft brown fur just like his. You feel his crotch pressing into the back of your head as you struggle to throw him off.',
			description: "You have thin arms with soft brown fur covering them."
		},
		tail : {
			attack: 'The rabbit leans back and then jumps at you, knocking you forward onto your belly. Your exposed ass ends up in the air, allowing the rabbit to grab your hips and start rubbing his thick furry cock against your hole. You feel fur growing on your butt, and then he leans back and shoves his cock inside you. His thick meat stretches you as he hammers and rams you rapidly. His foot slaps against the ground when he starts to cum, and as he fills your rear, you feel a little tufted bunny tail appear behind you.',
			description: "You have a little brown tufted rabbit tail with a white underside, that wiggles when you hop."
		},
		feet : {
			attack: 'The rabbit seems to focus most on your unprotected feet, his hopping and bouncing always tripping you or making you stumble, after which he pounces in to nuzzle or lick your bare soles. The more he does, the more you feel your feet growing, becoming longer and stronger, while soft brown fur begins to sprout from them. You stumble over your growing feet, landing on all fours, and he suddenly grabs your ankles and lifts your feet up, where his whiskered muzzle licks and nuzzles your soles. You squirm ticklishly as your feet finish growing out into long fluffy rabbit paws.',
			description: "You have very long and strong furry brown rabbit paws for feet."
		},
		hands : {
			attack: 'The rabbit jumps up onto you, his belly in your face. You push him off, but your unprotected hands have to press into his warm furry body to do it. You feel them grow fur and become shorter and thicker, as small claws appear on your fingertips.',
			description: "You have soft furry brown handpaws, with tiny claws hidden under the fuzz."
		},
		legs : {
			attack: 'The rabbit kicks at your back, making you stumble. He hops onto you, mounting you, but you manage to shake him off before he can get to your butt. Unfortunately, his scrabbling paws claw and touch at your unprotected legs, which thicken with muscle as they start to grow soft brown rabbit fur.',
			description: "You have strong legs covered in soft brown fur."
		},
		genitals : {
			attack: 'The rabbit kicks at you powerfully in the chest, knocking you back. Before you can get to your feet, he shoves down one of his long, powerful paws over your crotch. Your unprotected cock is squeezed under his warm fluffy sole, as he starts to grind and rub your crotch with his foot. You struggle and gasp, your cock hardening as your balls develop soft light-coloured fur. Your shaft becomes shorter, but thickens considerably, leaving you intensely horny. You manage to wriggle free before he can make you cum.',
			description: "You have a thick pink cock above a large pair of fluffy peach-furred balls, which are always horny and needy."
		}
	},
    character: 'o',
//    foreground: 'grey',
    maxHp: 15,
    attackValue: 10,
    speed: 2000,
    sightRadius: 4,
    tasks: ['hunt', 'investigate', 'wander'],
    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight, Game.EntityMixins.Hearing,
             Game.EntityMixins.Yiffer, Game.EntityMixins.Destructible, Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('rat', {
    name: 'rat',
    killMessage: 'The rat wrestles you to the ground, his skinny body surprisingly strong. He squeaks triumphantly, and you see him grab his hard throbbing cock and start to stroke and pump it. He shoves his crotch over your face, his huge musky balls pressing onto your nose and mouth. You find yourself licking and nuzzling them, your mind swimming as his scent takes control of you. You are helpless to resist when he forces his cock into your mouth and starts to thrust. You suck on it eagerly, like a delicious treat, until he shudders and nearly blows. He pulls out from you, and grins as his pulsing cock unloads a mess of hot, white rat cum all over your face and chest. The scent and heat makes you pass out...',
    attacks: {
		head : {
			attack: 'The rat jumps up and grabs your head. His whiskered muzzle presses to your face as he kisses you forcefully. You find yourself kissing him back, your face stretching out into a rat\'s snout as you do!',
			description: "You have a furry rat head, with a pointed grey muzzle and round pink ears."
		},
		chest : {
			attack: 'The rat rubs his pink hands across your chest, then licks and nuzzles it. His touch causes soft grey fur to grow all over your torso!',
			description: "You have a slender chest covered in soft grey fur."
		},
		arms : {
			attack: 'The rat grabs you from behind and leans forward, nuzzling and licking your shoulders and arms. You feel grey fur prickle as it grows all along your arms!',
			description: "You have thin arms with grey fur covering them."
		},
		tail : {
			attack: 'The rat grabs you and you feel his cock rubbing up between your butt cheeks. He shoves it into you, his length stretching your hole, and starts to hump. You feel a long pink tail curl from your rear as he fucks you, until you have a rat tail of your own!',
			description: "You have a long pink hairless rat tail that twitches when you are nervous."
		},
		feet : {
			attack: 'The rat grabs your leg and lifts your foot up to his face. He sniffs and licks it, his tongue sliding between your toes. Your feet grow longer, your toes dextrous and long, before claws emerge from them!',
			description: "You have long soft pink feet with clawed toes."
		},
		hands : {
			attack: 'The rat holds your hands and lifts them to his face, where he licks and kisses them. You feel your fingers grow longer as claws emerge from your fingertips!',
			description: "You have long pink hands with claws at the tips."
		},
		legs : {
			attack: 'The rat gropes and squeezes your legs, his pink hands rubbing your inner thigh. You feel soft grey fur forming under his teasing fingers!',
			description: "You have thin legs covered in grey fur."
		},
		genitals : {
			attack: 'The rat presses his face between your legs and starts to kiss and lick your balls. He then sucks on your cock, and you feel fur spread across your crotch, as it becomes ratlike with huge soft balls!',
			description: "You have a short pink cock and a pair of very large round furry grey balls."
		}
	},
    character: 'l',
//    foreground: 'grey',
    maxHp: 15,
    attackValue: 10,
    sightRadius: 4,
    dexterity: 3,
    tasks: ['hunt', 'investigate', 'wander'],
    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight, Game.EntityMixins.Hearing,
             Game.EntityMixins.Yiffer, Game.EntityMixins.Destructible, Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('fox', {
    name: 'fox',
    killMessage: 'The advances and teasing from the fox seems to sink into your mind, and you struggle to resist any longer. Looking at him grinning at you, all you can think about is how handsome and sexy he is. His eyes close over a little and he grins wickedly as he sees you succumb to his influence. One of his hands strokes along your chin, and you almost drool with lust for this gorgeous orange stud. He uses his other hand to stroke and grip his pointed red cock, and you find yourself falling to your knees. You nuzzle and lick the soft peach-colored fur on his balls, before eagerly sliding his cock into your mouth and sucking on it lovingly. He strokes and pets your head as you pleasure him, and when you feel his cock pulse and twitch on your tongue, you swallow every drop of the creamy white cum that he spurts into your throat. Looking up at him, the mental effect starts to overwhelm you, and you fall backwards as you pass out in bliss.',
    attacks: {
		head : {
			attack: 'The fox presses up against you, his furry slender body warm against your own. His long muzzle nuzzles your cheek, and you find yourself unable to resist as you open your mouth and let him kiss you. As his tongue strokes over yours, your face pushes out, becoming a pointed orange-and-cream lupine muzzle just like his.',
			description: "You have an orange and peach fox face with a slender muzzle and pointed ears."
		},
		chest : {
			attack: 'The fox\'s hands stroke along your chest, his long furry fingers teasing and touching you. You shudder as you feel soft orange fur growing from your skin, becoming fluffy and thick. The fox presses his chest to yours, your furry bodies twined together as you blush and feel intensely attracted to the vulpine male.',
			description: "You have a lithe handsome chest with soft orange fur."
		},
		arms : {
			attack: 'The fox presses against you from behind, his hands stroking down your arms as his padded fingers stroke and tease your skin. You feel orange fur tingling as it grows all down your arms, making them slender but firm just like his.',
			description: "You have slim arms with sleek orange fur covering them."
		},
		tail : {
			attack: 'The fox grins with sudden wickedness, and you yelp as he lunges down and presses his muzzle to your hole. His tongue licks and teases between your cheeks as his furry whiskered muzzle rubs up and down your rear. You feel your tailbone stretch and grow, as it lengthens out into a tail, which fluffy up with a thick orange and white fluffy brush of fur.',
			description: "You have a thick fox brush tail, with an almost white tip and soft thick orange fur."
		},
		feet : {
			attack: 'The fox slides against you and trips your ankles, causing you to stumble over onto your butt. He then kneels down and lifts your feet, massaging and stroking them with his fingers. His pressing and touch causes them to grow long and slender, with fur sprouting from them as they transform into clawed fox paws.',
			description: "You have long fox paws for feet, with black pads and sharp claws."
		},
		hands : {
			attack: 'The fox grabs your hands and leans in towards you as he holds them. His fingers twine with yours, and his chest rubs against you as you feel his warm body touching you. Your fingers grow long as black fur covers them, and claws emerge from the tips.',
			description: "You have dextrous orange pawhands, with padded palms and black claws."
		},
		legs : {
			attack: 'The fox strokes and teases your thighs with his fingers, then leans down and nuzzles his long muzzle against your leg. You feel fur growing down your legs as they become slender but strong.',
			description: "You have slender strong legs with orange fur."
		},
		genitals : {
			attack: 'The fox grabs your hips and kneels down. His whiskered muzzle nuzzles against your crotch, and he opens his mouth to start to suck on your cock. You are unable to pull free, and you start to get erect as his expert tongue licks and teases your shaft. You growl and shudder as you cum, and he swallows every drop before pulling free to reveal you now have a firm red fox cock between your legs.',
			description: "You have a long red cock with a firm knot, and soft peach fur covering your balls."
		}
	},
    character: 'm',
//    foreground: 'grey',
    maxHp: 30,
    dexterity: 2,
    attackValue: 10,
    sightRadius: 4,
    tasks: ['hunt', 'investigate', 'wander'],
    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight, Game.EntityMixins.Hearing,
             Game.EntityMixins.Yiffer, Game.EntityMixins.Destructible, Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('boar', {
    name: 'boar',
    killMessage: 'You can\'t take it any more, your body finally giving in under the force of the boar\'s attacks. You fall to the floor, exhausted. To your surprise, instead of immediately attacking you, the boar reaches down and presses some cake against your mouth. Unable to resist, you bite and swallow the thick, rich dessert. He forces another slice into your mouth, then kisses you, his flat piglike snout pushing against your mouth. You find yourself swallowing down cake even as you messily make out with the hairy boar. When he pulls away, you\'re in a confused daze. He licks his lips and sprays a thick mess of whipped cream onto his belly from a can. You find yourself leaning forward and licking up the fresh cream, but before you can even finish, the boar is pushing some huge chocolates into your mouth. After an orgy of food, you finally pass out. When you awaken, the boar is gone, but you\'re sure you\'ve gained quite a few pounds.',
    attacks: {
		head : {
			attack: 'The boar suddenly rams his hand forward, palm flat. He\'s holding a thick creamy handful of cake, and it shoves right into your mouth. You find yourself swallowing it, and the flavour makes you lick your lips. Your face pushes out as your nose flattens, growing into a thick flat boar snout. Two stubby tusks push from your lips as your head becomes porcine.',
			description: "You have a fat round boar head, with a flat piglike snout and thick tusks."
		},
		chest : {
			attack: 'The boar lunges forward and smears something cold on your chest. You shudder as you are coated in thick, sticky ice cream. He then leans in and starts to lick it up, his warm tongue contrasting with the cold dessert. You squirm as your belly fattens and grows, becoming huge and heavy. It hangs like a beach ball in front of you, before growing bristly fur like his.',
			description: "You have an enormously fat belly that hangs down over your crotch. It is covered with fur."
		},
		arms : {
			attack: 'The boar grabs your arms with his trotter-fingers and pulls you in close. You press against his fat soft belly, and you feel your arms thicken with fat and pudge, before it grows bristly boar fur.',
			description: "You have fat soft arms covered in bristly boar fur."
		},
		tail : {
			attack: 'The boar rattles a can of something, then sprays whipped cream in a messy white fluff all over your butt. His flat snout suddenly smushes against your rear and you feel him lick the cream off your ass. Your butt inflates massively, growing heavy with fat before you grow a short tufty boar tail.',
			description: "You have a very fat round rear, covered in boar fur with a short tufty tail."
		},
		feet : {
			attack: 'You slip on some of the boar\'s messy food remains. Your foot slides through a puddle of caramel syrup, and you fall down. The boar grabs your sticky foot and licks it clean, making your toes fuse and harden as they become fat black trotters.',
			description: "Your feet are covered in fur, with black trotters sticking out from the fuzz."
		},
		hands : {
			attack: 'The boar grabs your hands and presses them into his fat belly, making you bounce and jiggle it. You feel your fingers toughen into black trotters as the boar\'s stomach moves like a bowl of jelly under your grip.',
			description: "You have fat furry hands with tough trotterlike fingers."
		},
		legs : {
			attack: 'The boar reaches down and fondles your legs, his dirty trotters leaving smears of cream and chocolate. You feel your legs fattening and swelling out as he transforms them into fat furry boar legs like his.',
			description: "You have very big soft fat legs, covered in fur."
		},
		genitals : {
			attack: 'The boar spins a big glazed donut on his fat trotter finger, then suddenly slams the hole down on your cock. He leans down and nibbles the donut off your crotch, while your balls become furry and your cock swells into a massively thick boar cock, wider than it is long.',
			description: "You have a pair of heavy balls, and a shockingly fat cock, thicker than it is long."
		}
	},
    character: 'p',
//    foreground: 'grey',
    maxHp: 35,
    attackValue: 12,
    sightRadius: 4,
    tasks: ['hunt', 'investigate', 'wander'],
    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight, Game.EntityMixins.Hearing,
             Game.EntityMixins.Yiffer, Game.EntityMixins.Destructible, Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('bear', {
    name: 'bear',
    killMessage: 'After another massive swat from the bear\'s paw, you can\'t take any more. You fall down helpless before the mighty ursine. He reaches down and wraps something around your neck. You reach up, and feel the thick weight of a leather collar. A blush flushes your face red. "You\'ll make a great slave for your daddy", the bear growls. You feel a tug as he pulls back on a thick leash attached to the collar, and you rise to your knees. When he places cuffs around your wrists, and shackles on your ankles, you try to resist, but the more he binds you, the more you want to just obey him and stop thinking. He picks you up, while you struggle weakly against the bindings, and then shoves you down hard on his enormous, thick cock. You whine and moan as he pounds and fucks you. The pleasure grows more and more, along with the pressure of his musky body, until you pass out. You wake up much later, free of your bindings, but unable to shake the desire to belong to your daddy bear.',
    attacks: {
		head : {
			attack: 'The massive bear grabs you by the neck and drags you close. "Come to daddy", he growls, as he forces your face against his thick, furry bearded muzzle. You feel fur spreading across your face, and your mouth and nose stretch out into a blockish, furry ursine muzzle.',
			description: "You have a big furry bear head, covered with thick brown fur, and with a stocky fanged muzzle."
		},
		chest : {
			attack: 'The bear suddenly grabs you, and wraps his massive arms around your chest in a powerful bear hug. He lifts you up, and your face is pressed into his thick chest fur. "Give daddy a hug, my boy", he says. You feel your chest bulging out, growing muscle and thickening, before it softens with a layer of fat. Then you grow thick ursine fur, just like his.',
			description: "You have a heavy musclegut covered in shaggy brown bear fur."
		},
		arms : {
			attack: 'The bear grabs onto your upper arm with his massive handpaw. His padded palm squeezes against your skin, and he grins. "You\'ve got a lot of growing to do before you\'re as big as daddy, boy!", he says. You feel your arm bulge in his grip, thickening with muscle and growing heavy fur.',
			description: "You have big muscular arms covered in thick brown bear fur."
		},
		tail : {
			attack: 'The bear grips your rear in both his powerful hands, and leans in as he whispers in your ear. "Daddy would love to see your hot ass tight inside some leather shorts, boy", he says. You shudder as your butt tingles and grows thick, soft fur. A small round bear tail wiggles above your rear before you pull away.',
			description: "You have a big round brown-furred bear butt, with a little fluffy round tail."
		},
		feet : {
			attack: 'The huge bear grabs your ankles and pulls, making you fall backwards. He holds them in his grip and starts to rub your soles with his thumbs, making them grow thick, dark pawpads. "Yeah, daddy would love to put some shackles on these. Keep you trapped while I lick and tease ya!", he growls, as your feet become clawed bear paws.',
			description: "You have massive wide bear feet, with black padded soles and huge curved claws."
		},
		hands : {
			attack: 'The bear grabs your wrists, and you struggle to pull away, but can\'t escape his strength. "You\'d look great with some handcuffs on boy. Maybe I could cuff you to the ceiling while daddy fucks your ass!" he growls. You struggle more, while your hands thicken and grow, becoming furry and clawed.',
			description: "You have huge hands with black padded palms and heavy brown fur covering them."
		},
		legs : {
			attack: 'The powerful bear grabs your legs, and squeezes them hard. "Nice, but you need to spread these for your daddy, boy", he commands. You almost feel yourself about to obey, before you manage to kick and squirm free. Too late, though, because fur is spreading down your legs, as they thicken with muscle.',
			description: "You have thick heavy legs covered in brown fur."
		},
		genitals : {
			attack: 'The bear reaches down and grabs your cock and balls in his hand. He holds it tight as he pulls you close, and you are forced to smell his powerful manly stink. "I think you should have a nice leather strap around these balls, boy!", he growls. You shudder as your balls grow soft fur, and your cock thickens massively, becoming a fat heavy bear cock like his.',
			description: "You have a massively thick black bear cock. It stinks of manly musk."
		}
	},
    character: 'v',
//    foreground: 'grey',
    maxHp: 40,
    attackValue: 15,
    sightRadius: 4,
    tasks: ['hunt', 'investigate', 'wander'],
    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight, Game.EntityMixins.Hearing,
             Game.EntityMixins.Yiffer, Game.EntityMixins.Destructible, Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('wolf', {
    name: 'wolf',
    killMessage: 'With one more powerful blow, the wolf knocks you to the ground. You struggle to stand, but you are dizzy and confused. The wolfman lifts one of his powerful feet and shoves it down on your chest, holding you down as he leans forward and grins at you with his fanged maw. He lunges forward, his body atop yours as he pins you down. His warm, hot furry chest is panting above you, and his body is so musky and heavy. He opens his muzzle and bites down on your shoulder, before you feel his huge red cock poking at your rear. With a powerful thrust, he rams his way inside you, mounting and fucking you with rough and bestial force. As he fucks you, his knot starts to grow, and he howls as he rams it inside you, locking you in place. You are trapped under the mighty beast as he unloads his cum, and his corruption, inside you.',
    attacks: {
		head : {
			attack: 'The wolf grabs your head in his powerful claws and roughly kisses you. His slobbering tongue is forced into your mouth as his scruffy fur rubs against your face. You feel fur growing all over your head as your own mouth stretches into a long fanged muzzle.',
			description: "You have a long fanged muzzle, covered with thick shaggy grey fur, and pointed lupine ears atop your head."
		},
		chest : {
			attack: 'The wolf picks you up suddenly, with his strong hands at your sides. He opens his muzzle and licks along your chest, leaving trails of drool, and you feel thick shaggy grey fur growing where he\'s touched you.',
			description: "You have a powerful broad chest covered in thick grey fur."
		},
		arms : {
			attack: 'The wolf\'s fanged muzzle closes around your arm, and he growls as he tugs and shakes it like a bone. You feel thick fur growing along your arm, as it bulges and swells with lean, hard muscles.',
			description: "You have powerful muscular arms covered in shaggy grey fur."
		},
		tail : {
			attack: 'The wolf wraps his arms around your chest and squeezes you close to him from behind. You feel his enormous red cock as it pushes against your tight hole, and then he growls and snaps his muzzle, before ramming himself deep inside you. As he fucks you, you feel a thick shaggy grey tail grow from your rear, but you manage to escape before the horny beast can knot you.',
			description: "You have a thick furry grey tail that wags behind you when you get excited."
		},
		feet : {
			attack: 'The wolf lunges and bites at your feet as you try to dodge him. His slavering muzzle keeps licking and nipping at your feet, and you feel them growing and changing, the soles toughening with black pawpads and claws forming, along with thick grey fur.',
			description: "You have powerful grey paws, with firm pawpads and long sharp claws."
		},
		hands : {
			attack: 'The wolf claws and grabs at you. When you try to push him away, your hands press into his thick chest fur. You feel your palms toughen and harden, while claws grow from your fingertips and slide through his fur. When you pull them away, they\'re covered in the same fur as him.',
			description: "You have huge clawed hands with thick grey fur covering them."
		},
		legs : {
			attack: 'The wolf lunges at you and his muzzle closes around your leg. He growls as he tugs and shakes it like a chew toy. You feel thick fur growing along your leg, as it bulges and swells with lean, hard muscles.',
			description: "You have powerful legs covered in thick grey fur."
		},
		genitals : {
			attack: 'The wolf shoves you back as he reaches down and grabs your cock with one of his massive clawed handpaws. His long muzzle grins as he starts to pump and stroke you, your cock growing and thickening in his gasp. You feel the base inflate and grow, hardening into a thick canine knot, which he suddenly squeezes roughly and powerfully. You howl and shudder as your cock becomes a red pointed wolf cock.',
			description: "You have an enormous red cock, with a massive knot. It is always hard and you can't stop thinking about sex."
		}
	},
    character: 'n',
//    foreground: 'grey',
    maxHp: 60,
    attackValue: 20,
    sightRadius: 4,
    tasks: ['hunt', 'investigate', 'wander'],
    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight, Game.EntityMixins.Hearing,
             Game.EntityMixins.Yiffer, Game.EntityMixins.Destructible, Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('dragon', {
    name: 'dragon',
    killMessage: 'The brutal force of the dragon\'s attacks finally overwhelm you. His last blow knocks you several feet across the room, and you lie on the ground as you feel his massive footsteps shake the ground. Before you can even move, an enormous, scaly foot slams down on your belly, pinning you in place. You look up at the scaly horned face, as the dragon opens his glowing mouth. Suddenly, everything is blinding light and intense, unbearable heat. The dragon\'s breath washes over you, but it doesn\'t burn. Instead, every inch of your skin feels red-hot and pulses with ultra-sensitive pleasure. You scream as your entire body feels like it\'s orgasming. Your cock is rock-hard and exploding with cum, over and over, hot streams of jizz covering the dragon\'s foot. You can feel the dragon\'s corrupt fire sinking into your mind as it starts to burn away your willpower and leave nothing but pleasure. You want to serve this mighty monster. To be his slave. You are nothing but a servant...you awaken much later, feeling weak and covered in your own cum. You can feel deep inside you that part of your personality has been wiped away.',
    attacks: {
		head : {
			attack: 'The dragon grabs your face in his claws and pulls your mouth open, then opens his own. He shoves it close, and suddenly unloads a blazing hot energy from his firey breath directly into your throat. Your face pushes forward into a scaly muzzle, and you feel enormous horns burst from your forehead and curve backwards.',
			description: "You have a scaly reptilian head, with enormous heavy horns and glowing eyes."
		},
		chest : {
			attack: 'The dragon wraps his wings around you, engulfing you in the strange, spicy scent of his body. As you struggle to escape, your chest forms hard green scales. You feel your back itch before two bulges sprout out, becoming your own pair of stunted wings.',
			description: "You have a muscular chest plated with scales, and a pair of small green wings."
		},
		arms : {
			attack: 'The dragon\'s claws leave painful red slashes in your arms, but they quickly start to heal over when your skin starts to transform into shiny green scales, covering massive and powerful muscles.',
			description: "You have strong thick arms covered in hard green scales."
		},
		tail : {
			attack: 'The dragon\'s enormous ridged red cock slams against your rear as he hotdogs your ass. His dick slides up and down between your cheeks, making them grow and become hard and firm. Your tailbone stretches out, forming a massive and heavy muscular reptile tail that hangs behind you.',
			description: "You have a massive heavy reptilian tail covered in green scales, like an alligator's."
		},
		feet : {
			attack: 'The dragon breathes deep, then fires two balls of glowing hot white goo from his mouth. They cover your feet, trapping you in place. You struggle as they burn your feet, changing and teasing them. Your toes stretch out and become massive scaly talons, and you use your new claws to rip yourself free.',
			description: "You have enormous muscular feet with long scaly toes, each tipped with a wicked claw."
		},
		hands : {
			attack: 'You struggle to avoid the dragon\'s blows, when suddenly he bites down hard. His mouth has grabbed your hand, and his teeth dig into your skin. Your fingers are licked and teased by his massive tongue, and when you pull free, your hands have both transformed into scaly talons with massive claws.',
			description: "You have huge hands with massive sharp claws at the end of your scaly fingers."
		},
		legs : {
			attack: 'The dragon\'s claws dig hard into your legs, sinking into your flesh. You fall to the ground, but the brutal injury instantly heals, as your legs become muscular and strong, then form their own covering of unbreakable scales.',
			description: "You have powerful legs covered in hard green scales."
		},
		genitals : {
			attack: 'The dragon opens his mouth, then blasts something at your crotch. It flies like a fireball, but the glowing hot plasma sticks to your crotch like glue. The heat surges, and you moan and gasp as your cock is pumped and teased by the goo. It thickens and grows, stretching and becoming ridged and inhuman, until you unload white-hot glowing cum that washes the slime away.',
			description: "You have a long inhuman cock, thick and red, with flared ridges down the underside."
		}
	},
    character: 'u',
//    foreground: 'grey',
    maxHp: 70,
    attackValue: 30,
    sightRadius: 3,
    tasks: ['hunt', 'investigate', 'wander'],
    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight, Game.EntityMixins.Hearing,
             Game.EntityMixins.Yiffer, Game.EntityMixins.Destructible, Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('dog', {
    name: 'guard dog',
    character: 't',
    foreground: 'white',
    maxHp: 6,
    attackValue: 4,
    sightRadius: 5,
    tasks: ['wander'],
    conversation: {
    	text: 'You are surprised to encounter an infected who doesn\'t seem to want to attack you. He is a tall and muscular german shepherd, wearing a security guard hat and wielding an enormous flashlight. He flashes it at you when you approach, then nods when he seems satisfied. \'A survivor eh? Be careful, we don\'t need any more hooligans running around the halls, jizzing on everything! Tell you what son, if you bring me some proof that you\'ve been taking out these criminals, I will give you a reward. I know how to increase your strength without mutating you!\'',
        options: [
            {
                choice: 'Give WOLF CUM',
                valid: function(target) {
                	return target.hasItem("wolf cum") && !target._gotwolf;
                },
                conversation: {
                	text: 'The guard dog nods with satisfaction when you hand over the cum. He carefully bags it in a plastic sandwich bag labelled \'EVIDENCE\', then pulls you closer. His huge furry body is warm and powerful as he holds you in his mighty paws. He guides your hands across his chest, making you feel and touch the strong hard muscles under his fur. As you start to explore and feel his body, you feel your own body grow tingly and warm. Your muscles start to bulge and grow, stretching and inflating as new strength packs on you under your skin. You feel stronger than ever! He grins at you. \'Looking like a true guardian of the peace now, son!\', he says.',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                				target.increaseAttackValue(1);
                				target._gotwolf = true;
                				if (target._dogprogress) {
                					target._dogprogress++;
                				}  else {
                					target._dogprogress = 1;
                				}
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Give BEAR CUM',
                valid: function(target) {
                	return target.hasItem("bear cum") && !target._gotbear;
                },
                conversation: {
                	text: 'The guard dog nods with satisfaction when you hand over the cum. He carefully bags it in a plastic sandwich bag labelled \'EVIDENCE\', then pulls you closer. His huge furry body is warm and powerful as he holds you in his mighty paws. He guides your hands across his chest, making you feel and touch the strong hard muscles under his fur. As you start to explore and feel his body, you feel your own body grow tingly and warm. Your muscles start to bulge and grow, stretching and inflating as new strength packs on you under your skin. You feel stronger than ever! He grins at you. \'Looking like a true guardian of the peace now, son!\', he says.',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                				target.increaseAttackValue(1);
                				target._gotbear = true;
                				if (target._dogprogress) {
                					target._dogprogress++;
                				}  else {
                					target._dogprogress = 1;
                				}
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Give BOAR CUM',
                valid: function(target) {
                	return target.hasItem("boar cum") && !target._gotboar;
                },
                conversation: {
                	text: 'The guard dog nods with satisfaction when you hand over the cum. He carefully bags it in a plastic sandwich bag labelled \'EVIDENCE\', then pulls you closer. His huge furry body is warm and powerful as he holds you in his mighty paws. He guides your hands across his chest, making you feel and touch the strong hard muscles under his fur. As you start to explore and feel his body, you feel your own body grow tingly and warm. Your muscles start to bulge and grow, stretching and inflating as new strength packs on you under your skin. You feel stronger than ever! He grins at you. \'Looking like a true guardian of the peace now, son!\', he says.',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                				target.increaseAttackValue(1);
                				target._gotboar = true;
                				if (target._dogprogress) {
                					target._dogprogress++;
                				}  else {
                					target._dogprogress = 1;
                				}
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Give DRAGON CUM',
                valid: function(target) {
                	return target.hasItem("dragon cum") && !target._gotdragon;
                },
                conversation: {
                	text: 'The guard dog nods with satisfaction when you hand over the cum. He carefully bags it in a plastic sandwich bag labelled \'EVIDENCE\', then pulls you closer. His huge furry body is warm and powerful as he holds you in his mighty paws. He guides your hands across his chest, making you feel and touch the strong hard muscles under his fur. As you start to explore and feel his body, you feel your own body grow tingly and warm. Your muscles start to bulge and grow, stretching and inflating as new strength packs on you under your skin. You feel stronger than ever! He grins at you. \'Looking like a true guardian of the peace now, son!\', he says.',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                				target.increaseAttackValue(1);
                				target._gotdragon = true;
                				if (target._dogprogress) {
                					target._dogprogress++;
                				}  else {
                					target._dogprogress = 1;
                				}
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Give RABBIT CUM',
                valid: function(target) {
                	return target.hasItem("rabbit cum") && !target._gotrabbit;
                },
                conversation: {
                	text: 'The guard dog nods with satisfaction when you hand over the cum. He carefully bags it in a plastic sandwich bag labelled \'EVIDENCE\', then pulls you closer. His huge furry body is warm and powerful as he holds you in his mighty paws. He guides your hands across his chest, making you feel and touch the strong hard muscles under his fur. As you start to explore and feel his body, you feel your own body grow tingly and warm. Your muscles start to bulge and grow, stretching and inflating as new strength packs on you under your skin. You feel stronger than ever! He grins at you. \'Looking like a true guardian of the peace now, son!\', he says.',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                				console.log(target);
                				target.increaseAttackValue(1);
                				target._gotrabbit = true;
                				if (target._dogprogress) {
                					target._dogprogress++;
                				}  else {
                					target._dogprogress = 1;
                				}
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Give FOX CUM',
                valid: function(target) {
                	return target.hasItem("fox cum") && !target._gotfox;
                },
                conversation: {
                	text: 'The guard dog nods with satisfaction when you hand over the cum. He carefully bags it in a plastic sandwich bag labelled \'EVIDENCE\', then pulls you closer. His huge furry body is warm and powerful as he holds you in his mighty paws. He guides your hands across his chest, making you feel and touch the strong hard muscles under his fur. As you start to explore and feel his body, you feel your own body grow tingly and warm. Your muscles start to bulge and grow, stretching and inflating as new strength packs on you under your skin. You feel stronger than ever! He grins at you. \'Looking like a true guardian of the peace now, son!\', he says.',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                				target.increaseAttackValue(1);
                				target._gotfox = true;
                				if (target._dogprogress) {
                					target._dogprogress++;
                				}  else {
                					target._dogprogress = 1;
                				}
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Give RAT CUM',
                valid: function(target) {
                	return target.hasItem("rat cum") && !target._gotrat;
                },
                conversation: {
                	text: 'The guard dog nods with satisfaction when you hand over the cum. He carefully bags it in a plastic sandwich bag labelled \'EVIDENCE\', then pulls you closer. His huge furry body is warm and powerful as he holds you in his mighty paws. He guides your hands across his chest, making you feel and touch the strong hard muscles under his fur. As you start to explore and feel his body, you feel your own body grow tingly and warm. Your muscles start to bulge and grow, stretching and inflating as new strength packs on you under your skin. You feel stronger than ever! He grins at you. \'Looking like a true guardian of the peace now, son!\', he says.',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                				target.increaseAttackValue(1);
                				target._gotrat = true;
                				if (target._dogprogress) {
                					target._dogprogress++;
                				}  else {
                					target._dogprogress = 1;
                				}
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask about himself',
                valid: function(target) {
                	return true;
                },
                conversation: {
                	text: '\'Me? I don\'t know what my name used to be. I\'m not even sure who I was. When the outbreak happened, I think I was feeding a guard dog down in the car park. The next thing I know, that weird glowing light washed over me, and I was falling forward onto the dog! My body was pressing into his, and I could feel his fur flowing over my skin. I became stronger, tougher, and when our heads pressed into eachother and became one, I realised all I cared about was the law, and protecting people! I don\'t know if I\'m that dog, or that human, but I am happy the way I am. No way do I want to turn back!\'',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask for advice',
                valid: function(target) {
                	return true;
                },
                conversation: {
                	text: '\'Keep as much clothing on as you can, son. You don\'t want those freaks touching you, or else you\'ll end up exactly like them. I did a patrol earlier and there\'s more folks like me who are still sane. One on each floor by my count, except for the ground floor. Try finding them and seeing if they can help you out.\'',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask to rub his feet',
                valid: function(target) {
                	return target._dogprogress > 0;
                },
                conversation: {
                	text: '\'Hmm. Well, I suppose you\'ve shown you can be trusted. Consider this a reward for being a good boy\', the dog says. He sits down and lifts up one of his muscular furry legs, showing you the padded sole of his huge furry foot. You take hold of it, and start to rub your fingers through his musky fur. His pawpads are firm and smooth, and his thick black claws jut out proudly from his thick brown fur. You make sure to squeeze hard when you massage him, to get out all the knots and aches. When you try to let go, he shoves the foot forward, and presses it over your face. \'Lick up, son. That\'s the taste of hard-working justice!\', he says. You obediently lick up the sweat that clings to his pawpads, tasting his salty and musky feet. Only then does he let you stop.',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask to suck his cock',
                valid: function(target) {
                	return target._dogprogress > 2;
                },
                conversation: {
                	text: 'The big dog grins. \'Makes sense, you want to make me feel good for being such a good dog, don\'t you son?\', he says. Before you can reply, he takes hold of your head in one of his massive hands, and shoves you down between his legs. His naked sheath is musky and sweaty, and you see his thick red cock emerge from it, hardening and swelling. He forces your mouth over his cock, and then begins to hump and thrust into your face. His tail wags rapidly as his thrusting gets faster and faster. He starts to pant and drool, and your face bumps against his crotch hard. You feel the base of his cock starting to swell and harden as his knot emerges. With one strong thrust, he forces it into your mouth, then barks loudly when his twitching, throbbing cock unloads thick hot ropes of cum deep into your throat. He holds you there for several minutes, unloading over and over, and when he releases you, your stomach feels swollen with his dog cum. \'You\'re a good boy too, son. Keep serving your public servants!\'',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask to become a guard dog',
                valid: function(target) {
                	return target._dogprogress > 3;
                },
                conversation: {
                	text: 'The dog scratches his chin in thought at your request. \'Wow, you want to join the force? You have shown a lot of potential, I admit. You\'ll have to give up on your old life, though! Are you sure about this?\' he says. You nod eagerly, already having made up your mind. Seeing your acceptance, he takes hold of your face and pulls you in towards him. His powerful muzzle presses against you as he kisses you, his hot saliva and long tongue rolling around inside your mouth. You feel your teeth sharpening, and your own tongue growing as you kiss him back. He pulls away, then turns you around and shoves you against a wall with his powerful hairy arms. You sense him kneel down and then feel his cold wet nose rub between your buttcheeks. His long tongue licks your rear, getting you wet and slippery. Your tailbone stretches out, growing thick hairy fluff as you develop a wagging tail of your own. He then stands up, and presses his body against your back. You feel his hard cock sliding into your dripping hole, and your insides are stretched around his thick red rocket. He thrust and slams into you, over and over, and you feel your body changing. Muscles harden and grow under your skin, and you grow taller and wider. Your bones creak as they stretch and change. Your face lengthens into a muzzle, and your ears stretch up to points. Your feet toughen against the floor, and you hear the scratching of your growing claws against the carpet. Your rock-hard cock turns red, thickening and growing, and you gasp as you feel your own sensitive knot appearing at the base. He slams his cock into you extra hard, and you both bark and snarl as his knot pops inside you. You cum, spraying the wall with jizz, exactly when you feel him unload inside you. The heat of his cum flows deep into your ass, and you moan and drool with happiness. While you are dazed with bliss, he raises his arm, then holds your head, turning it and pulling it down. You blink with surprise as your new black dog nose is shoved into his sweaty, musky armpit! The manly, overpowering stink of him fills your lungs. \'You are a dog. You live to serve and protect. You must guard this hotel. You are a good dog. You are a good dog\', he says, over and over. Your mind starts to crumble from the stink and the words, and your old identity fades away. You are a good dog. A loyal, obedient guard dog. You must protect the hotel! From now on you live only to serve. Your old life is over, you are now a loyal canine.',
                	options: [
                	]
                }
            },
            {
                choice: 'Ask to become his jockstrap',
                valid: function(target) {
                	return target._dogprogress > 3 && target._kinky;
                },
                conversation: {
                	text: 'You explain to the dog that as a powerful symbol of law and order, he really should have his big furry balls protected in something stylish and snug. Something special that he can trust to support him. He scratches his chin and considers it. \'You make a good point, son. What do you suggest, though?\' he says. You grin as you reveal your kinky idea. He shoud use the mutagen and turn YOU into his jockstrap! He blinks with surprise, then grins. \'You know what son, that sounds like a great idea! I love a volunteer who wants to help out his public servants!\', he says with a lusty growl. He grabs hold of your head, then pushes you down towards his crotch. You inhale his musky, masculine scent, and eagerly open your mouth so he can push his cock and balls inside, over your tongue. You can feel the mutagen tingle as it affects your mouth, making your tongue feel dry and absorbant. You wrap your arms around his waist, and shiver with lust as your muscles shrink, and your arms get thinner and flatter. He grins down at you, and pats your head. \'You will be a wonderful jockstrap, son!\', he says. Your whole head is starting to flatten against his crotch, while your skin feels soft and dry. It\'s changing colour, becoming fabric. Your arms are changing into blue elastic straps, and your hands are fusing together above your new owner\'s tail. The dog reaches down, under his own legs, and grabs your feet. You feel them squish and merge together as he pulls them back through his legs, and up against your changing hands. Your whole body is flattening out and becoming fabric, as your entire self is wrapped around his crotch. You feel his cock and balls stretching your head, and you can feel your features melting away into the fabric. Your eyes and ears disappearing into white cotton. Your hands and feet becoming part of the waistband. Finally, you are nothing but a stretched-out jockstrap on the guard dog\'s crotch. He pats and rubs your former head, and you would shiver if you could. You cannot move at all, though. You can only smell his rank musk and taste his hot, thick cock. You are nothing but an object, trapped forever.',
                	options: [
                	]
                }
            },
            {
                choice: 'End',
                stop: true
            }
        ]
    },
    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight, Game.EntityMixins.Talker]
}, {
    disableRandomCreation: true
});

Game.EntityRepository.define('pink rabbit', {
    name: 'pink rabbit',
    character: 'r',
    foreground: 'white',
    maxHp: 6,
    attackValue: 4,
    sightRadius: 5,
    tasks: ['wander'],
    conversation: {
    	text: 'You are surprised to encounter an infected who doesn\'t seem to want to attack you. He is a short bunny with unnaturally pink fur, and he bounces and zips around you at ludicrous speeds. His entire body seems to constantly be vibrating, and he giggles in an unhinged way when you speak to him. \'HehehHEHEHhehehe! More! Need more juice! Gimme the juice!\', he demands. His clutching hands shake as he waves an empty energy drink can at you. \'Gimme the juice, and I can make you fast! Fast fast fast!\', he mutters.',
        options: [
            {
                choice: 'Give ENERGY DRINK',
                valid: function(target) {
                	return target.hasItem("blitz energy drink");
                },
                conversation: {
                	text: 'The crazy rabbit rips the can out of your hands at lightning speed, and glugs it in one go. His eyes glow electric blue, as static fizzes on his whiskers, and he starts giggling uncontrollably. Before you can react, he knocks you to the ground and sits on top of you, then presses his long pink paws into your hands. You rub and touch them, and feel strange energy flow through you. Your own feel ache and stretch, growing longer and stronger. You can feel energy and power growing in them. By the time the rabbit lets you go, you have gained a shoe size, and you feel faster and lighter on your feet. \'Fast fast fast!\', the bunny says.',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                				target.removeItemByName('blitz energy drink');
                				target.increaseAttackValue(1);
                				if (target._rabbitprogress) {
                					target._rabbitprogress++;
                				}  else {
                					target._rabbitprogress = 1;
                				}
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask about himself',
                valid: function(target) {
                	return true;
                },
                conversation: {
                	text: '\'I was a coder, visitin the con to hook up with some artists for making a game!\', the rabbit says in his pitchy, too-fast voice. \'I did an all nighter the night before, so I was slammin down these energy drinks to stay awake. Some of those rabbits got me, and before I knew it, they\'d rubbed their feet all over me and I was growin big ears and long fluffy paws! Then something weird happened! They all got blasted across the room with electricity, and my new fur turned pink and I felt like I was in the biggest caffeine rush of my life! Now I NEED MORE SODA!!!\'',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask for advice',
                valid: function(target) {
                	return true;
                },
                conversation: {
                	text: '\'Try lookin for kettles! Water\'s no good for drinkin, but you can fill up a kettle, boil that shit, and throw it at some of these guys to really give them a problem! Oh, and never EVER eat a computer virus!\'',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask to rub his feet',
                valid: function(target) {
                	return target._rabbitprogress > 0;
                },
                conversation: {
                	text: '\'Wow, you\'re basically a pawslave, huh? Well alright, but you\'re not getting any free powerups out of it!\', he says. You eagerly take hold of one of his long, fluffy pink paws when he stretches it out towards you. The fur prickles and sparks when you rub it, but it doesn\'t hurt like you\'d expect. Instead, the sparks just dance down your fingers and make them tingle and feel warm. You press your thumbs into his soft, warm soles, and he wiggles his fluffy toes. You slide your hands up and down the long inhuman paw, feeling his fur brush against your touch. He grins and lifts both his feet, then presses them against your face. His tingly soles rub up and down your cheeks as your vision is obscured by warm darkness. You lean into them and kiss his soft sole, before he pulls his feet away. \'That\'s all you get for now. Bring me more soda!\', he says.',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask to suck his cock',
                valid: function(target) {
                	return target._rabbitprogress > 2;
                },
                conversation: {
                	text: 'The rabbit sighs. \'Well alright. I guess you earned a reward\', he says. He stands up, and strokes himself, teasing and adjusting his crotch with his pink-furred hand. You are surprised by the size of his massive off-white balls, and the thickness of the cock bouncing between his legs. He pumps and squeezes it, and gives you a big buck-toothed grin. You get down on your knees, and he puts both of his hands on your head, before thrusting forward and guiding his cock into your mouth. It tingles on your tongue, and tastes of the same artificial-flavouring as the soda he\'s addicted to. He keeps pushing, until his cock is squeezing against the inside of your throat, and you\'re almost gagging on it. Then he starts to hump. His crotch slams in and out, ramming deep into your mouth and then pulling back for another before you can possibly recover. He gets faster, pounding and abusing your face with jackhammer thrusts, and you gurgle and cough, unable to do anything but let him use you like a fucktoy. His foot starts thumping against the ground as his pleasure builds, and his fucking somehow gets even faster, becoming a blur. Finally he pants and shakes. \'Fuuuuuck!\', he shouts, as he climaxes into your throat. His hot, thick cum tastes just like energy soda, and it gushes and bursts into your mouth with such force that some of it bounces back and drips down your chin. He hops backwards, panting and grinning, and you almost collapse from the facefucking you just received.',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask to become a rabbit',
                valid: function(target) {
                	return target._rabbitprogress > 3;
                },
                conversation: {
                	text: 'The rabbit looks annoyed at your suggestion. \'But then we\'ll BOTH be competing for soda cans!\', he yells. His footpaw thumps rapidly against the ground as he thinks about it, then he sighs. \'Well alright, fine. You can be my bro, but I call the shots!\', he relents. He bounces forward with that lightning speed, and grabs your head in his soft furry hands. His muzzle presses against your mouth as he kisses you, his tongue slipping into your mouth and the warmth of his face pressing and nuzzling against yours. You feel him stroke your ears, rubbing his hands up and down as they start to stretch in his grip. He teases and strokes them more, using his thumbs to rub the insides of your growing ears. You can feel them sprouting soft fur, just like his. Your cheeks get fluffy, and your face pushes out into his muzzle as you grow one of your own. Still kissing you, he starts to rub your chest. Stroking and touching you, spreading his pink fur everywhere he touches. He pulls away from the kiss, and pushes you down onto your back. He sits down, then presses his long feet against yours, starting to tease and rub your toes with his own fluffy ones. Your feet begin to grow, stretching out to match his, and forming their own soft pink fur. You wiggle your new paws, grinning a buck-toothed smile. Then he stands up, hops over in a flash, and suddenly one of his feet is pressing down on your face, while the other strokes and grinds against your cock. You feel yourself growing fur on your balls, your body changing completely, becoming an exact twin of his. The warmth and scent of his foot smothers your face, and you can\'t see anything else. Your mind feels fuzzy and distant, and you can\'t seem to remember your name, or where you come from. \'Ok twin bro. You\'re me, got it? You like everything I like. You think everything I think. There\'s nothin left of that human. Just two identical pink rabbits. Big feet, big ego. Endless addiction to that tasty, sugary, perfect soda...\', he says. You can hear him drooling when he mentions the soda. You start to drool too. It tastes so good. You want some of it right now! You bounce up from the ground, rolling and tackling your brother. The two of you turn and tumble around the room, and you vaguely remember that you were transforming a human, weren\'t you? Was one of you the human? Oh well, it doesn\'t matter. You look at your brother\'s grinning pink face, and lunge in for a kiss. Fuck, his mouth tastes like that soda! The two of you kiss and nuzzle eachother, squeezing and rubbing your pink bodies together. It looks like you both just found a new addiction, and your new life as a pink rabbit clone has just begun.',
                	options: [
                	]
                }
            },
            {
                choice: 'Ask to become his paw',
                valid: function(target) {
                	return target._rabbitprogress > 3 && target._kinky;
                },
                conversation: {
                	text: 'You tell the rabbit that you have been thinking a lot, and you really admire his feet. They\'re so long, and strong, and perfect. That warm, powerful sole. The scent of sugary artificial flavourings. The unnatural pink colour. You love it so much that you just can\'t be away from it. He looks at you with a slightly confused expression. \'So...what are you gettin at?\', he asks. It\'s time to reveal your kinky desires. You tell him that you want to use the mutagen to become his foot, forever! He stares at you in disbelief, then shrugs. \'You know what, alright. You\'ve earned it. You can be my foot\', he says. He suddenly zips around the room, his motions a blur, and then there is a firm, rough kick on your back. You fall forward, landing on the carpeted floor, on your belly. You feel his long foot press down on your back, and he starts to push and rub it up and down your body. You feel yourself start to shrink, and pink fur begins to sprout on your back. It spreads across your skin and down your sides. Your arms are pushed out in front of you, and you find that you can\'t angle them back down anymore. The rabbit\'s foot sinks slowly into your body, melting and merging into you. You feel him wiggle and move his toes, and your arms and head move involuntarily. Your body is getting simpler, your legs melting and fusing together, then drawing up into his heel. Your belly is flattening and growing the pale fur of his sole, and your arms are bulging out, then shortening. You feel his short claws push out from your former hands, sticking out slightly from the thick fur covering the front. You can see that your arms are now both toes, on either side of you. Your mouth opens as another claw pushes out from it, and then your jaw seals around it. Your facial features melt away as fur covers you completely. You feel yourself shrinking more, and you can taste and smell the carpet beneath you, as the rabbit\'s weight pushes down on you. He wiggles his toes some more, and pushes them into the fabric, and your body moves to respond. You cannot move at all except by his commands. You are nothing but his long, warm footpaw now. Trapped forever as a body part.',
                	options: [
                	]
                }
            },
            {
                choice: 'End',
                stop: true
            }
        ]
    },
    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight, Game.EntityMixins.Talker]
}, {
    disableRandomCreation: true
});

Game.EntityRepository.define('raccoon', {
    name: 'raccoon',
    character: 'w',
    foreground: 'white',
    maxHp: 6,
    attackValue: 4,
    sightRadius: 5,
    tasks: ['wander'],
    conversation: {
    	text: 'You are surprised to encounter an infected who doesn\'t seem to want to attack you. He is a short, fat raccoon, who is crawling nervously through the furniture, and rooting around in the discarded clothes people have left behind. He jumps in nervous terror when you approach, then sighs and grins to you. \'I don\'t care about all the fucking the other furs are doing. I just want just want s s socks. Dirty socks...musky ones. If if you find any, I\'ll teach you to be to be sneaky...\', he says. His voice cracks and stammers a little when he talks about his beloved sock fetish.',
        options: [
            {
                choice: 'Give SMELLY SOCKS',
                valid: function(target) {
                	return target.hasItem("smelly socks");
                },
                conversation: {
                	text: 'The raccoon\'s eyes almost seem to light up when he sniffs the dirty socks you\'re holding. He grabs them eagerly, and presses them into his muzzle, breathing deep. His cheeks and arms flush pink with a deep blush as he shudders. He then nods to you, and pulls you in close to teach you his tricks. As you lean down, he suddenly shoves the socks over your face. You are forced to breathe in the musky, sweaty stink, and you feel something weird tingle in your fingers and toes. Somehow, you feel now that you won\'t trip as easily on difficult terrain.',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                				target.removeItemByName('smelly socks');
                				target.increaseDexterity(1);
                				if (target._raccoonprogress) {
                					target._raccoonprogress++;
                				}  else {
                					target._raccoonprogress = 1;
                				}
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask about himself',
                valid: function(target) {
                	return true;
                },
                conversation: {
                	text: 'I was an artist! This was my first furcon. I was actually planning to see if I could meet some friends and collaborate on a game about escaping from a hotel, when all this happened. To be honest, this is a dream come true. I mean...I\'m a cute smelly raccoon! The first thing I did when everyone started changing was start rubbing some furry feet and stealing their socks. I have no idea why I didn\'t go crazy like everyone else. Maybe because I was more interested in the socks than the sex?',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask for advice',
                valid: function(target) {
                	return true;
                },
                conversation: {
                	text: 'The best weapon in this place is the electric carver. There might still be one in the kitchen if you\'re lucky. Get your dexterity up, then lure some enemies over chairs and rubble. Enemies standing on obstacles lose their turns, but with high dex you won\'t be troubled. Gets you plenty of free hits!',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask to rub his feet',
                valid: function(target) {
                	return target._raccoonprogress > 0;
                },
                conversation: {
                	text: '\'Yeah you can totally play with my paws. I have conditions though!\', the raccoon says. He scampers around, collecting up the musky socks that he has scattered all around him. He then takes two of the damp, warm socks, and slides them down over each of your hands. You look down at your hands and flex your fingers in the makeshift mittens. They smell strongly of the masculine stink of the wolves that are roaming the halls. Next, the raccoon take a few socks and balls them up into a musky lump, which he forces against your face. You open your mouth wide, allowing him to gag you with them. They taste salty and dirty, and the stink of furry feet fills your nose. He chuckles. \'Ok, now you can play with me\', he says. He pushes on your chest, and you lie down on your back obediently for him. He shoves his long black-padded paws to your face, and rubs it over your cheeks and forehead. His paws are sweaty and gritty with dirt. You get the feeling he got them this musky on purpose. The scent is surprisingly enjoyable. It\'s earthy and musky, smelling strongly of wild animal, but with a hint of masculinity and sexuality. You barely get any chance to rub them or take initiative. He knows exactly what he wants to do, and you just have to endure it. He steps on your nose and mouth, making you inhale his stink. He pushes his toes into your mouth and rubs them against your sock gag. Then he sits on your chest and pushes his feet against your hands until you take hold of them and start to rub. Once he is satisfied, he releases you with a mischievous chuckle.',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask to suck his cock',
                valid: function(target) {
                	return target._raccoonprogress > 2;
                },
                conversation: {
                	text: 'The dirty raccoon grins with glee. \'Sure you can! But first you\'ve gotta kiss my ass\', he says. Before you can agree or not, he clambers up your body and lifts his striped tail. Your face is covered immediately by his furry, fluffy rear. You have no choice but to open your mouth and press your tongue to his tailhole. Fortunately, it\'s clean, but his musky aroma does completely surround you. He rubs his rear against your face and then suddenly flips around. His body presses down on your torso, and your face is shoved into his thick, musky fur. He stinks like the bottom of a rat\'s cage, but there\'s a powerful smell of sex and masculinity mixed in with the aroma. His hips thrust up towards you as he shoves his cock into your mouth. Your nose is forced into his furry crotch, and you are helpless as he fucks your face, using you like nothing more than a toy. While he thrusts into you, he reaches behind you and pulls up something. It\'s a pair of socks, knotted around the middle. He wraps it around your face like a blindfold. You can see nothing, and it enhances the taste and smell of his cock pounding into your throat. His hands grip your cheeks as he grunts and shoves firmly. You feel his cock pulse and pound, as he unloads cum into your throat. You can hear him panting atop you, while he sprays load after load into you. Once he is finally done, he leans back, and you are permitted to pull off your blindfold. You think you will be smelling him for quite a while after this.',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask to become a raccoon',
                valid: function(target) {
                	return target._raccoonprogress > 3;
                },
                conversation: {
                	text: 'The raccoon grins. \'I don\'t blame you for asking, who wouldn\'t want to be a dirty sock sniffing raccoon? There\'s nothing better in the world!\', he says gleefully. He shoves you down onto his pile of smelly socks, with arms that are surprisingly strong for his diminuitive size. Then he rolls you over, and shoves your face hard into the filthy material. He holds your head down, not letting you turn even a little to get fresh air. \'Don\'t fight it, bro. This is your life now\', he commands. You feel your face tingling and itching. The sweaty socks are rubbing their musk onto you, and you are growing fur all over your cheeks. Your ears grow pointed and move to the top of your head, and you feel the fur spreading down your neck. The raccoon positions himself over your ass, and you grunt into the pile of socks when you feel his hard cock shove into your rear. As he starts to pound you, you feel your changes accelerate. Your tailbone grows and fluffs up with fur. It slides up his belly, and he grips it in one hand as your stripes form on it. You realise he\'s not forcing you to smell the dirty socks anymore, but you keep doing it anyway. You can\'t resist. The pleasure of him slamming your prostate is mixing with the arousing feeling of breathing in the musky foot stink of all the people he\'s collected these from. You reach into the pile and shove a huge handful against your face, savouring and obsessing over every individual scent. You feel your feet stretch and grow furry and clawed. Your soles becoming padded, just like your changing hands are. Your whole body is covered in black and white fur, identical to the raccoon who\'s fucking your ass right now. You can\'t remember anything about your old life. Every smelly lungful of this musk is washing it all away, and you don\'t care. You are a sock raccoon now. All you want is to obsess over the socks and feet of every dirty furry in this hotel! Your new twin brother grunts, and you twitch your tail as you feel him unload into your ass. His hot cum flooding you, pushing your pleasure over the top. You hump the sock pile, your own cock blowing as well, making a huge sticky mess in your treasured collection. You feel him pull out and squeeze you close to him, and you know you have made the right choice for your new life.',
                	options: [
                	]
                }
            },
            {
                choice: 'Ask to become his socks',
                valid: function(target) {
                	return target._raccoonprogress > 3 && target._kinky;
                },
                conversation: {
                	text: 'Your new kinky corrupted mind can\'t help but desire to feel yourself transform into something inanimate and helpless. With this one track mind raccoon, you think you know exactly how to get him to assist you with those desires. You ask him straight out, would he be willing to use the mutagen to turn you into a sock? You are not too surprised when his eyes gleam and he jumps onto you, knocking you down onto your back. He grabs a handful of musky socks, and starts to rub and grind them against your face. You obediently inhale the ripe musky stink of the sweaty fabric, and feel a strange tingling as he shoves it against you. Your skin starts to darken and feel damp and heavy. He moves his rubbing hands further down, smearing sweat all over your chest, and you feel yourself tingle and itch, as your skin transforms into dirty, smelly cotton. He keeps rubbing, and starts to push you down as he does it, down into the huge pile of dirty socks under you. Your insides feel heavy and strange, and you find that as he keeps rubbing, you can taste and smell through the parts of your body that are becoming sock fabric. He slides socks over your hands and feet, and squeezes them firmly, while you feel your flesh and bones transform to cotton. He rolls one over your cock and balls, then rubs and grinds against it as your manhood softens and disappears. Then he pushes your head down into the pile. Socks cover you completely, and you can see nothing, only feel the damp dirty material and smell that sweaty rank stink. He holds you down there until you realise you\'re not moving, or breathing, at all. Then he pulls you up, your body limp and heavy. Your face is now completely smooth and black, just a featureless sphere of dirty sock fabric. The horny raccoon grins as he pulls on your head, peeling off a sock from your face. It comes off, revealing more socks beneath. He pulls them off from your hands, and feet, and cock, removing you layer by layer and throwing you into the pile. You feel every removed sock like it\'s still a part of you. You can taste the sweat and dirt, and sense your consciousness spreading out. As he pulls you apart, your body shape slowly disappears, until finally he\'s unrolling the balls of socks inside you, and you are nothing but a huge number of socks scattered throughout his collection. You feel him pick up one of your socks, and slide you over his cock. You can taste it as his oozing shaft enters you, and smell his musky raccoon stink. You are every single one of those dozens of socks, and he is going to be using you as his smelly playthings for a long, long time.',
                	options: [
                	]
                }
            },
            {
                choice: 'End',
                stop: true
            }
        ]
    },
    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight, Game.EntityMixins.Talker]
}, {
    disableRandomCreation: true
});

Game.EntityRepository.define('owl', {
    name: 'owl',
    character: 's',
    foreground: 'white',
    maxHp: 6,
    attackValue: 4,
    sightRadius: 5,
    tasks: ['wander'],
    conversation: {
    	text: 'You are surprised to encounter an infected who doesn\'t seem to want to attack you. He is a short, fat owl, with thick fluffy feathers and enormous glasses balanced on his beak. \'Ah, greetings my friend! Goodness me, it is noisy out there isn\'t it! Do you know what\'s going on?\', he asks. You explain to him that everyone is turning into sex-mad furries, including himself. \'Oh! That does explain why my eyesight is improving. I only really care about books though. Bring me some, and I\'ll improve your eyesight toooo!\'',
        options: [
            {
                choice: 'Give BOOK',
                valid: function(target) {
                	return target.hasItem("book");
                },
                conversation: {
                	text: 'The owl takes the book from you with his large wing-hands, and flicks through it eagerly. He places it aside, and motions with a feather-finger for you to bend down to his height. \'Now, look into my big brown owl eyes, my friend. Notice their intensity and power. Can\'t you feel your perception improving? Your eyesight getting better, as you notice and realise how handsome and attractive the owl before you is. Not fat, but delightfully round and extremely sexy. You want to serve him by bringing him more books...\', he says. His voice makes you feel dizzy and confused, but you do feel like your eyes are better. You wonder if he was lying about not having any interest in sex...',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                				target.removeItemByName('book');
                				target.increaseSightRadius(1);
                				if (target._owlprogress) {
                					target._owlprogress++;
                				}  else {
                					target._owlprogress = 1;
                				}
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask about himself',
                valid: function(target) {
                	return true;
                },
                conversation: {
                	text: 'I was just one of the visitors coming to see the con and look at some of the cool artwork and suits. When I found out this hotel had libraries, I ended up spending way too much time in those, though! I never really liked porn or sex stuff, so when the outbreak happened, I just stayed with the books. It was pretty weird when I started to grow feathers, and I admit the beak was hard to get used to, but to be honest, I kind of like being an owl. My eyesight used to be terrible! I still don\'t really want to join the rest of the furs getting randy out there, though.',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask for advice',
                valid: function(target) {
                	return true;
                },
                conversation: {
                	text: 'You probably know that there are helpful items in closets and wardrobes, but you can find them in other places too. Try searching beds, bookshelves, and sinks. Just watch out, I think one of the books was affected by the mutagen. It\'s acting...weird.',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask to rub his feet',
                valid: function(target) {
                	return target._owlprogress > 0;
                },
                conversation: {
                	text: '\'Ah! Oh my. You really want to rub my...talons?\', the owl asks. You see a faint red blush under the feathers of his cheeks. \'Well, I suppose I don\'t mind\', he relents. He takes you to an armchair and grabs one of his books, then jumps up onto it. He leans back and lifts up his chubby yellow feet. His toes are tipped with thick black claws, and the soles are a little pudgy and soft, unlike the firm yellow skin on the rest of his feet. You sit down next to the chair while he reads, and start to play with his feet. Your fingers press gently into his soft soles, and you take the time to rub and stroke each of his long toes. He squirms a little when you squeeze firmly, but mostly he seems to enjoy your relaxing touch. He even teases you a little, by lifting one of his feet and pressing it to your face. When his long toes curl around your head, you realise his grip is very powerful, befitting an owl. You grin and kiss his sole, starting to lick and service it. He releases you, then raises both feet, using them to hold your head in a strong embrace while he looks down at you. \'That was actually kinda nice!\', he admits.',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask to suck his cock',
                valid: function(target) {
                	return target._owlprogress > 2;
                },
                conversation: {
                	text: '\'Ah! I\'m terribly sorry, but I actually am not into that sort of thing. But, perhaps we could cuddle?\', the owl offers. He extends his wide wing-hands to you, and pulls you in close to his round portly body. His feathers are soft and fluffy, and he\'s surprisingly cuddly and squishy. His wings wrap around you like a warm blanket, and he nuzzles his short beak against your cheek. You kiss him back, pressing your mouth to the smooth firm yellow chitin. You press your fingers into his round belly, and slide them up and down. His feathers fluff under your touch as you massage and stroke him. He slides his beak gently against your neck and nuzzles your chest, and you lie down and hold him atop you like a large teddy bear. His clawed feet grip your legs as he embraces you, and you stay close to him like that for quite some time. It\'s more enjoyable than you might have expected, just to hug him and feel his warmth. It\'s easy to forget the craziness outside, when you have a big soft happy owl cooing gently against your chest.',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask to become an owl',
                valid: function(target) {
                	return target._owlprogress > 3;
                },
                conversation: {
                	text: 'The owl claps his winghands together with glee. \'You want to be an owl too? That\'s wonderful!\' he says. He puts down his books and hops over to you, then reaches up to you with his long featherfingers. His hands stroke along your cheeks as he pulls you down towards him, then kisses you with his smooth, firm beak. His tongue licks against yours, and you instinctively kiss him back. You feel your face hardening and shifting. Your nose and chin push out together, as the skin on them begins to toughen and harden. You can hear the clacking where your growing beak touches against his. The longer you kiss, the easier it gets to lean over and do it more, because your body is shrinking to the same height as the short, portly owl. You feel pins and needles all over your body, as feathers begin to emerge from you. They come out like spines, then unfurl and flatten into their full fluffy size. You wrap your arms around the owl, and feel your hands start to stretch. Each of your fingers lengthens massively, and starts to flatten. The brown colour of your feathers spreads across them, and you flex them with surprise. Your fingers have become thick, long feathers, but they still bend and grip and touch like fingers would. You use your wide new winghands to give your owl-brother a really big hug, one which he returns eagerly. You feel your belly bulge and swell, growing round and soft just like his. Your feet stretch out, your toes growing longer, and you feel a slight pain as your toenails bulge and stretch into powerful talons. The feeling of your clawed feet against the ground, and the sensation of the skin on them becoming tough and yellow, reminds you that despite your adorable body, you are a bird of prey. The room around you sharpens and becomes brighter, as you find yourself able to see every detail of everything around you. The titles of all your friends discarded books are clear as day. No gloom or darkness seems to affect you. Your massive, growing eyes can see in perfect clarity! You turn to look at your owl friend, and with your new vision you can see how very handsome he is. You smile and nuzzle your beaks together, sure that you will be very happy in your new life!',
                	options: [
                	]
                }
            },
            {
                choice: 'Ask to become his teddy bear',
                valid: function(target) {
                	return target._owlprogress > 3 && target._kinky;
                },
                conversation: {
                	text: 'You gently ask the owl what sort of things he likes, hoping to get some ideas so that you can enact your new, corrupted fetish fantasies. He chats for a while about comics and books, then blushes when he mentions that he really likes big plush toys that he can squeeze and hug. Jackpot! You\'re already shivering with the thought of being trapped as an immobile inanimate plush toy. You tell the cute innocent owl that you\'d really love to be able to hug him and be close all the time. To never leave his side, and be a loyal and adorable cuddly friend. He seems curious, and that\'s when you seal the deal. He should use the mutagen, and turn you into a big happy inanimate plush bear! He is clearly shocked by your suggestion, but he considers it carefully. \'Well...if that\'s what you want...I trust you, my friend! You can be my toy!\', he says. He starts to rub your chest with his long feather fingers, sliding them up and down your body. You feel a tingling inside you as his desires control the effect of his mutagen. Your skin prickles and feels strange as ultra-soft, light brown fur begins to sprout all over you. It\'s shiny and sleek, looking unreal and artifical. Your belly bulges and grows, becoming round and fat, but it doesn\'t feel heavy. Instead, your insides feel light and airy, as you vaguely feel your organs starting to dissolve into cotton fluff. There\'s a squeezing sensation up your sides, and you look over to see stitches appearing in your fabric skin. Your hands and feet bulge out, becoming fat and soft. Your fingers become stubby and mittenlike, and your limbs get thick and heavy. You feel weak and light-headed, so you fall backwards onto your butt. You bounce a little, and grin when there\'s an odd bulging sensation of your fabric tail growing in. You feel your ability to move fading, but you don\'t really have any desire to move anyway. You flop, relaxed and happy, as your big smile seals in place, becoming a sewn-on expression on the bulging fabric snout you\'re growing. Your eyes open wide, then seal over, becoming shiny plastic. Your ears become soft round fabric too, and then with one last twitch and shudder, you go perfectly still. The owl walks over and picks you up, and you dangle in his grip. You\'re just a huge soft teddybear now. He wraps his wings around you in a big squeeze hug, and your whole body is filled with warm pleasure. Yeah, you\'re going to be perfectly happy with your new life.',
                	options: [
                	]
                }
            },
            {
                choice: 'End',
                stop: true
            }
        ]
    },
    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight, Game.EntityMixins.Talker]
}, {
    disableRandomCreation: true
});

Game.EntityRepository.define('cat', {
    name: 'cat',
    character: 'q',
    foreground: 'white',
    maxHp: 6,
    attackValue: 4,
    sightRadius: 5,
    tasks: ['wander'],
    conversation: {
    	text: 'You are surprised to encounter an infected who doesn\'t seem to want to attack you. He is an enormously tall and fat black cat, wearing a chef\'s hat. He wanders around, looking at the ruined restaurant with annoyance and frustration. He notices you, and rubs his chin. \'You there, guest! I hate to ask this of a customer, but could you bring me some salmon? I need it desperately for tonight\'s dinner, but all my employees seem to be too busy roaming the halls, masturbating! I can help you get stronger, I know a little something about girth and constitution!\', he says.',
        options: [
            {
                choice: 'Give SALMON',
                valid: function(target) {
                	return target.hasItem("salmon");
                },
                conversation: {
                	text: 'The cat takes the salmon from you with a sigh of great relief. \'And I thought that dinner would be ruined! You\'re a life saver, my friend. Here, let me teach you how to be more sturdy...\', he says. He takes your hands and presses them firmly onto his huge round warm belly. You find yourself stroking and feeling his heavy gut. You jiggle it and shift the weight, and feel your own body changing. Your stomach growls as soft pudge forms around your waist, your body getting a little heavier and stockier. You gained a few pounds, but you feel like you can take more of a beating!',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                				target.removeItemByName('salmon');
                				target.increaseMaxHp(10);
                				if (target._catprogress) {
                					target._catprogress++;
                				}  else {
                					target._catprogress = 1;
                				}
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask about himself',
                valid: function(target) {
                	return true;
                },
                conversation: {
                	text: '\'Me? I was a chef working here at the con. I was preparing lunch when the outbreak hit! It was very frustrating trying to handle all of the cooking while everyone was running around, trying to fuck eachother. A few of the more rambunctious guests I ended up turning into lunch! I don\'t mind this too much, to be honest. I am far too busy maintaining the kitchen to be concerned about a little thing like growing fur.\'',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask for advice',
                valid: function(target) {
                	return true;
                },
                conversation: {
                	text: '\'Make sure to eat enough, or you won\'t be able to recover your strength after you get into a tussle. If one of those guests gets too frisky, try spraying them with one of the bottles we keep in the storage closets. That usually gets rid of them!\'',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask to rub his feet',
                valid: function(target) {
                	return target._catprogress > 0;
                },
                conversation: {
                	text: '\'Thank you kindly, it does get tiring working in this hot kitchen all day! Not to mention carrying around this weight!\', he says. He lifts and jiggles his fat furry black belly to demonstrate. Before you can even reply, he suddenly bounces his huge gut against you, and you stumble to the ground. You see one of his massive black paws lift up and then lower down onto your face. His large toes rub against your forehead while his sole smothers your nose and face. It\'s very warm, and extremely heavy. Musky feline sweat makes his paw salty and damp. \'Well, start licking! You\'re not going to offer to service me without going all the way, are you?\', he says. You gulp, but then obediently begin to lick at his soft pawpads. His sweat actually doesn\'t taste that bad. It\'s salty and ripe, but strangely addictive. Before long, you\'re kissing and rubbing your face all over his foot. You rub the sides as he strokes it over your face, making sure you squeeze and massage his big toes and thick furry feet. Once he\'s satisfied, he releases you from under your musky prison, only to lower his other foot onto you next. You eagerly await the return of that hot warm weight on your face, and spend a long happy time servicing and licking that one too. When you\'re finally finished, your whole face reeks of his musky masculine scent.',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask to suck his cock',
                valid: function(target) {
                	return target._catprogress > 2;
                },
                conversation: {
                	text: '\'Hmm, I don\'t normally let people drink straight from the source, you know. That\'s bad kitchen manners. But I\'ll make an exception for you\', he says. His strong hands grab your shoulders, before he shoves you down onto your knees. He pushes you up against the kitchen counter, with your head just under the lip of the granite countertop. You see his massive furry belly get close, before he lifts it up and then reaches down to grip his shaft beneath. Even hidden under his enormous gut, his cock is huge. He pushes it closer to you, and rubs and grinds it over your cheeks. You open your mouth obediently, and your cheeks are stretched as he slowly shoves it into your face. His salty pre coats your tongue, and you grunt a little as he pushes in deeper and deeper. Your face is left stuck in the warm musky crevice between his huge belly and his big furry black balls, with your mouth and throat totally filled by a huge throbbing cock. Then you hear a chopping noise from the countertop above you, and the sound of stirring soup. You try to ask a muffled question, but the cat just ignores you. Every now and then, he thrusts and shoves his cock into you, particularly when you struggle or try to escape. He\'s getting on with his cooking! Your jaw aches as you are forced to endure this for over an hour, used as nothing more than a cockwarmer for the big cat chef. Finally, he sips his soup and sighs appreciatively. \'There, all done! Thanks for helping out in the kitchen\', he says. Suddenly your head is pushed hard against the underside of the counter, as the big cat starts to thrust and shove himself into you. His huge belly jiggles and bounces as his thrusting gets faster and harder. After an hour\'s worth of edging, keeping himself hard by using your mouth, it doesn\'t take long to go over the top. You feel his cock unload a massive flood of hot cum deep into your throat. So much of it that your own belly feels like it\'s going to get bloated and fat as well. Once he\'s finally pumped every last drop into you, he finally pulls out, and lets you flop exhausted on the floor.',
                	options: [
                		{
                			choice: 'Leave',
                			effect: function(target) {
                			},
                			stop: true
                		}
                	]
                }
            },
            {
                choice: 'Ask to become a chef',
                valid: function(target) {
                	return target._catprogress > 3;
                },
                conversation: {
                	text: 'The chef nods appreciatively. \'You can join the kitchen staff, of course! Not as a cat, though. We only have one head chef in this kitchen. But you will be an excellent new assistant chef!\', he says eagerly. He doesn\'t give you a chance to respond, and instead grabs a pot of his soup from the kitchen counter. You blush in surprise as he lowers it between his legs, and grabs hold of his thick cock. He grunts and pumps it, letting his thick precum slosh and drip right into the pan. Then he sighs in pleasure as he spurts huge thick ropes of white cum right onto the soup, letting it slosh and splat all over it like cream dressing. He stirs the musky salty jizz into it with a spoon, then raises the spoon and shoves it right into your mouth! You swallow the salty soup, surprised, and feel your body starting to change. Your belly gurgles and starts to swell. It bulges and grows rapidly, becoming a small round potbelly. You find yourself hungry for more, and you start to greedily slurp up the soup when your head chef hands it over. White fur spreads across your body, soft and fluffy. It covers your chubby belly and down to your ankles, but your feet grow long and smooth and hairless. Your toes stretch out and develop little claws, and your hands do the same. You feel a thin pink tail grow from your rear, stretching out and twitching gently. Your face pushes forward into a pointed fluffy white muzzle, and your ears stretch out wider as they become big and round. You squeak happily at the taste of the soup, your mind filling with thoughts of what spices and herbs and preparations could make it even tastier. Your new whiskers sprout and wiggle on your pink nose. You are the sous chef, after all! You barely notice the world around you seem to grow larger as you shrink, your body compressing down to barely even half the height of your head chef\'s massive form. You reach over and pump his cock, producing a handful of sticky pre that you stir into the soup. Just needed a little more salt! The big cat grins widely as your mind is completely filled with cooking ideas and cheerful thoughts. He licks his lips. You\'ll either advance the ranks in his kitchen by showing you\'re a good chef...or you\'ll get a promotion to being part of his belly, when he uses you as a tasty snack!',
                	options: [
                	]
                }
            },
            {
                choice: 'Ask to become his cock',
                valid: function(target) {
                	return target._catprogress > 3 && target._kinky;
                },
                conversation: {
                	text: 'You ask the cat about any special ingredients he uses in his cooking. He grins widely, showing off his pearly white fangs. \'Why, lots of LOVE, of course!\', he says. When he says \'love\', he reaches down and gropes his fat and heavy cock. Judging by the pre leaking from his bulging tip, he clearly means he jizzes in the food. Perfect. You tell him that as a chef, surely he wants the absolute best source for his ingredients. Clearly he takes good care of his cock, and pumps and pleasures it regularly, but it could be even better. He looks at you with interest, and you reveal your plan. He should use the mutagen, and transform YOU into his cock! Making it even bigger and more fertile. \'Why, that\'s a terrific idea!\', he says. He grabs you and lifts you up, then holds you down firmly on top of one of his counters. You feel his huge cock press against your rear, before it slowly forces its way inside you. You\'re stretched almost painfully by the size of his manhood, but somehow whenever it feels like you\'re about to feel discomfort, there\'s a wash of pleasure through you, and you feel able to take even more. Soon, he\'s hilted himself up to his balls inside your ass. You can feel heat and pleasure growing where your butt is pressed against his furry crotch. Your body starts to pulse and pound with heat and feeling. Your arms and legs shrink, becoming weak and limp as they pull up against your sides. Your body bulges out and gets thicker and rounder, and you start to drool salty, thick slime from your mouth. The cat\'s hands grip you around the waist as he starts to pump and stroke you. It feels absolutely incredible. Every touch is orgasmic. Your whole body feels stiff and hard, and you don\'t care at all that your limbs and even your cock and balls are shrinking away and disappearing. Your facial features start to melt away into the huge, swollen round red shape of your head, leaving only your mouth as a gushing oozing slit. Finally, the pleasure becomes too much, and you feel and explosion of lust burst through you. Hot, thick, sticky cum spurts from your face, splattering all over the wall in an enormous dripping mess of musky seed. You feel your stiffness lessen, as you flop and twitch, still perpetually leaking. There is no trace of you left in the cat\'s new fat cock. Nothing except it\'s obscene size would indicate that you are now just a body part, trapped forever and used only for your master\'s pleasure.',
                	options: [
                	]
                }
            },
            {
                choice: 'End',
                stop: true
            }
        ]
    },
    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight, Game.EntityMixins.Talker]
}, {
    disableRandomCreation: true
});

//
//Game.EntityRepository.define('boar', {
//    name: 'boar',
//    character: 'B',
//    foreground: 'brown',
//    maxHp: 6,
//    attackValue: 4,
//    sightRadius: 5,
//    tasks: ['hunt', 'wander'],
//    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight,
//             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible,
//             Game.EntityMixins.CorpseDropper,
//             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
//});
//Game.EntityRepository.define('dragon', {
//    name: 'dragon',
//    character: 'D',
//    foreground: 'green',
//    maxHp: 6,
//    attackValue: 4,
//    sightRadius: 5,
//    tasks: ['hunt', 'wander'],
//    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight,
//             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible,
//             Game.EntityMixins.CorpseDropper,
//             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
//});
//