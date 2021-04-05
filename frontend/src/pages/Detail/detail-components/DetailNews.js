import { React, useState, useEffect } from "react";
import axios from "axios";

export default function DetailNews() {
  const [items, setItems] = useState(new Array());

  useEffect(() => {
    console.log({
      appnews: {
        appid: 70,
        newsitems: [
          {
            gid: "4026754911343743045",
            title:
              "Valve's Robin Walker says Half-Life fans should be 'excited about possibility again,' does not mention the number 3",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/PC Gamer/4026754911343743045",
            is_external_url: true,
            author: "Rich Stanton",
            contents:
              '<img src="https://cdn.mos.cms.futurecdn.net/y4Dn5SLn35oKS83sG56e6b.jpg"/><br><br>\n                Valve&apos;s Robin Walker, one of its most senior developers and a key figure in the creation of everything from Half-Life to Team Fortress to Dota 2, recently gave an interview to <a href="https://www.thegamer.com/half-life-alyx-ending-robin-walker-narrative-limbo/" target="_blank">The Gamer</a> discussing the company&apos;s internal reaction to making Half-Life: Alyx and gave something of a tease about things to come...\n                <a href="https://www.pcgamer.com/valves-robin-walker-says-half-life-fans-should-be-excited-about-possibility-again-does-not-mention-the-number-3?utm_source=steam&utm_medium=referral" target="_blank">Read more.</a>',
            feedlabel: "PC Gamer",
            date: 1616606410,
            feedname: "PC Gamer",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "4703417046207198182",
            title: "Half-Life is becoming a Game Boy game",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/PCGamesN/4703417046207198182",
            is_external_url: true,
            author: "editor@pcgamesn.com",
            contents:
              '<img width="900" height="507" src="https://www.pcgamesn.com/wp-content/uploads/2021/02/Half_Life_Game_Boy-900x506.jpg"/><p>We may be none the wiser for <a href="https://www.pcgamesn.com/half-life-3/half-life-3-release-date-story-gameplay-art">Half-Life 3</a>, but that hasn\'t stopped the community from <a href="https://www.pcgamesn.com/half-life/doom">finding cool, new ways</a> to play the original <a href="https://www.pcgamesn.com/half-life">Half-Life</a>. The latest is Half-Life GB, a Game Boy-style remake that makes Valve\'s <a href="https://www.pcgamesn.com/15-best-pc-first-person-shooters">FPS game</a> even more surreal than usual.</p>\n<p>Made by developer Jackarte, Half-Life GB supplants the typical browns and greys of Black Mesa for multiple shades of green, in a 3D environment that, missing many of the finer details, is just a bit unnerving. A 15 minute demo, viewable below, shows a play-through of Half-Life\'s iconic opening, wherein Gordon Freeman finds himself in the middle of an inter-dimensional invasion after one of Black Mesa\'s experiments malfunctions.</p>\n<p>Wielding Freeman\'s trusty crowbar, you batter headcrabs and headcrab zombies, wandering through corridor after corridor in hopes of escape. The demo stretches as far as Freeman getting to the outside world, where a platoon of marines has been sent to kill all survivors and cover-up the incident, and you battle helicopters and tanks and such. This is definitely stretching the capabilities of the base handheld, but it does strike a <a href="https://www.pcgamesn.com/wolfenstein-3d">Wolfenstein 3D</a>-like middle-ground that has its charms.</p>\n<p><a href="https://www.pcgamesn.com/half-life/game-boy">Read the rest of the story...</a></p>\n<p>RELATED LINKS:<br />\n<a href="https://www.pcgamesn.com/half-life/doom">Here\'s Doom re-imagined in Half-Life</a><br />\n<a href="https://www.pcgamesn.com/best-easter-eggs-in-games">Best Easter eggs in games: the greatest gaming jokes on PC</a><br />\n<a href="https://www.pcgamesn.com/half-life/google-translate-mod">This hilarious Half-Life mod "horribly" mistranslates everything through Google</a></p>',
            feedlabel: "PCGamesN",
            date: 1613231668,
            feedname: "PCGamesN",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "3917534300113652086",
            title: "Awesome Games Done Quick 2021 has begun",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/Rock, Paper, Shotgun/3917534300113652086",
            is_external_url: true,
            author: "contact@rockpapershotgun.com (Imogen Beckhelling)",
            contents:
              '<p><a href="https://assets.rockpapershotgun.com/images/2021/01/dragon-age-origins-1.jpg"><img src="https://assets.rockpapershotgun.com/images/2021/01/dragon-age-origins-1.jpg" alt="" width="1440" height="810" class="alignnone size-full wp-image-928181" title=""></a></p>\n<p>Get your speedrunning shoes on and prepare your glitches: Awesome Games Done Quick has arrived for its yearly speedrunning extravaganza. As with previous years, the charity event is raising money for the Prevent Cancer Foundation. It’s been live since yesterday evening and runs until this Sunday, and there are already some fab runs in the likes of Mirror’s Edge and Dragon Age: Origins to catch up on.</p>\n<p> <a href="https://www.rockpapershotgun.com/2021/01/04/awesome-games-done-quick-2021-has-begun/#more-928161" class="more-link"><span aria-label="Continue reading Awesome Games Done Quick 2021 has begun">(more…)</span></a></p>',
            feedlabel: "Rock, Paper, Shotgun",
            date: 1609773988,
            feedname: "Rock, Paper, Shotgun",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "3917534300113703234",
            title: "Awesome Games Done Quick 2021 has begun",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/rps/3917534300113703234",
            is_external_url: true,
            author: "contact@rockpapershotgun.com (Imogen Beckhelling)",
            contents:
              '<p><a href="https://assets.rockpapershotgun.com/images/2021/01/dragon-age-origins-1.jpg"><img src="https://assets.rockpapershotgun.com/images/2021/01/dragon-age-origins-1.jpg" alt="" width="1440" height="810" class="alignnone size-full wp-image-928181" title=""></a></p>\n<p>Get your speedrunning shoes on and prepare your glitches: Awesome Games Done Quick has arrived for its yearly speedrunning extravaganza. As with previous years, the charity event is raising money for the Prevent Cancer Foundation. It’s been live since yesterday evening and runs until this Sunday, and there are already some fab runs in the likes of Mirror’s Edge and Dragon Age: Origins to catch up on.</p>\n<p> <a href="https://www.rockpapershotgun.com/2021/01/04/awesome-games-done-quick-2021-has-begun/#more-928161" class="more-link"><span aria-label="Continue reading Awesome Games Done Quick 2021 has begun">(more…)</span></a></p>',
            feedlabel: "Rock, Paper, Shotgun",
            date: 1609773988,
            feedname: "rps",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "3856733252003435170",
            title:
              "Black Mesa's Definitive Edition update makes it just about finished",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/rps/3856733252003435170",
            is_external_url: true,
            author: "contact@rockpapershotgun.com (Alice O'Connor)",
            contents:
              '<p><a href="https://assets.rockpapershotgun.com/images/2020/11/black-mesa-gonarch.jpeg"><img src="https://assets.rockpapershotgun.com/images/2020/11/black-mesa-gonarch.jpeg" alt="The Gonarch in a Black Mesa screenshot." width="1568" height="882" class="alignleft size-full wp-image-918143" title="The Gonarch in a Black Mesa screenshot."></a></p>\n<p>After over a decade of work (and nine months after actually releasing the game), the <a href="https://www.rockpapershotgun.com/game/black-mesa/">Black Mesa</a> gang are finally just about finished remaking Half-Life. Today they launch a big update they’re calling the ‘Definitive Edition’, with changes including a visual refresh of many areas, performance improvements, extra polishing, and a redo of one level from the bit with all the trains. They… still have a few wee fixes to follow, but it seems they’re really, truly, mad, deeply almost done with it.</p>\n<p> <a href="https://www.rockpapershotgun.com/2020/11/25/black-mesas-definitive-edition-update-makes-it-just-about-finished/#more-918083" class="more-link"><span aria-label="Continue reading Black Mesa’s Definitive Edition update makes it just about finished">(more…)</span></a></p>',
            feedlabel: "Rock, Paper, Shotgun",
            date: 1606331701,
            feedname: "rps",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "3884878205232886170",
            title: "AGDQ 2021 lineup includes Hades and Sekiro",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/rps/3884878205232886170",
            is_external_url: true,
            author: "contact@rockpapershotgun.com (Imogen Beckhelling)",
            contents:
              '<p><a href="https://assets.rockpapershotgun.com/images/2020/08/hades-artwork.jpg"><img src="https://assets.rockpapershotgun.com/images/2020/08/hades-artwork.jpg" alt="Artwork of Hades character Zagreus, stood looking really cool in the middle of some Hyrda heads." width="1920" height="1080" class="alignnone size-full wp-image-875021" title="Artwork of Hades character Zagreus, stood looking really cool in the middle of some Hyrda heads."></a></p>\n<p>While next year&rsquo;s Awesome Games Done Quick won&rsquo;t be held in-person, the charity speedrunning event is still going ahead, and it looks like it has some brilliant runs in store. AGDQ 2021&rsquo;s game list was revealed over the weekend, and oooh January can&rsquo;t come soon enough. From the new mythological roguelike <a href="https://www.rockpapershotgun.com/game/hades/">Hades</a> and charmingly difficult platformer <a href="https://www.rockpapershotgun.com/game/celeste/">Celeste</a>, to old favourites like <a href="https://www.rockpapershotgun.com/game/half-life/">Half-Life</a> and <a href="https://www.rockpapershotgun.com/game/left-4-dead-2/">Left 4 Dead 2</a>; there are some absolute belters in the lineup.</p>\n<p> <a href="https://www.rockpapershotgun.com/2020/11/03/agdq-2021-lineup-includes-hades-and-sekiro/#more-907617" class="more-link"><span aria-label="Continue reading AGDQ 2021 lineup includes Hades and Sekiro">(more&hellip;)</span></a></p>\n',
            feedlabel: "Rock, Paper, Shotgun",
            date: 1604416368,
            feedname: "rps",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "3715990047705459802",
            title: "Here's Doom re-imagined in Half-Life",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/PCGamesN/3715990047705459802",
            is_external_url: true,
            author: "editor@pcgamesn.com",
            contents:
              '<img width="900" height="507" src="https://www.pcgamesn.com/wp-content/uploads/2020/09/Half-Life_Doom_Mod-900x506.jpg"/><p>Two of the most iconic and beloved <a href="https://www.pcgamesn.com/15-best-pc-first-person-shooters">FPS games</a> ever made, together at last. Half-Life: Crowbar - Deep in the Dead is a <a href="https://www.pcgamesn.com/half-life-alyx/mods">Half-Life mod</a> that transforms Valve\'s classic from a hellish <a href="https://www.pcgamesn.com/best-survival-games">survival game</a> on Earth to, well, a hellish survival game on Mars.</p>\n<p>The mod converts id Software\'s Union Aerospace Corporation\'s waste facilities into the cleaner, greyer corridors, offices, and parking lots of the Black Mesa Research Facility. In the demo, you play-through a melding of Half-Life\'s opening chapter with <a href="https://www.pcgamesn.com/doom">Doom</a>\'s E1M1, wherein some scientists open an inter-dimensional portal for horrific creatures to break through and, when you really get down to it, there\'s not a <em>huge</em> amount of difference in context between the two <a href="http://pcgamesn.com/old-games-best-classic-pc-games">old games</a>, is there?</p>\n<p>A cool thing about Half-Life: Crowbar is that you aren\'t Gordon Freeman, or Doomguy, you\'re engineer Dr. Stan Blazkowicz, an homage to <a href="https://www.pcgamesn.com/wolfenstein-the-new-order">Wolfenstein</a> protagonist BJ Blazkowicz, who adorns the Doom suit where Freeman got his HEV outfit. You\'re not the one who pulls the lever like in Half-Life either, rather just someone stuck in the middle of a very unfortunate situation, having to crowbar and shoot your way through a large number of headcrabs.</p>\n<p><a href="https://www.pcgamesn.com/half-life/doom">Read the rest of the story...</a></p>\n<p>RELATED LINKS:<br />\n<a href="https://www.pcgamesn.com/best-easter-eggs-in-games">Best Easter eggs in games: the greatest gaming jokes on PC</a><br />\n<a href="https://www.pcgamesn.com/half-life/google-translate-mod">This hilarious Half-Life mod "horribly" mistranslates everything through Google</a><br />\n<a href="https://www.pcgamesn.com/half-life/free-to-play">Every Half-Life game is free-to-play on Steam for the next two months</a></p>\n',
            feedlabel: "PCGamesN",
            date: 1601216282,
            feedname: "PCGamesN",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "3819571572130693483",
            title:
              "Why Half-Life ruined videogames for me forever: a Christmas story",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/PCGamesN/3819571572130693483",
            is_external_url: true,
            author: "editor@pcgamesn.com",
            contents:
              '<img width="900" height="507" src="https://www.pcgamesn.com/wp-content/uploads/legacy/Half_Life_2.jpg"/><p>Sometimes it isn\'t just the game you\'re playing, it\'s all the surrounding factors that determine how and why you\'re playing the game at that exact moment. The idea that external factors might affect enjoyment levels isn\'t something people often concede in game criticism, nor in pub arguments, because if you admit it that judging one game against another is anything other than a scientific process, the whole house of cards falls down. Personally, every time I think about Half-Life, the greatest game I have ever and will ever play, I see that house of cards levelled in front of me.</p>\n<p><a href="https://www.pcgamesn.com/half-life/why-half-life-ruined-videogames-for-me-forever-a-christmas-story">Read the rest of the story...</a></p>\n<p>RELATED LINKS:<br />\n<a href="https://www.pcgamesn.com/best-easter-eggs-in-games">Best Easter eggs in games: the greatest gaming jokes on PC</a><br />\n<a href="https://www.pcgamesn.com/half-life/google-translate-mod">This hilarious Half-Life mod "horribly" mistranslates everything through Google</a><br />\n<a href="https://www.pcgamesn.com/half-life/free-to-play">Every Half-Life game is free-to-play on Steam for the next two months</a></p>\n',
            feedlabel: "PCGamesN",
            date: 1599770914,
            feedname: "PCGamesN",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "4828375451938580673",
            title: "Half-Life update released",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/4828375451938580673",
            is_external_url: true,
            author: "mikela",
            contents:
              'An update for Half-Life is now available:\n\n[h1]Fixes and Updates[/h1][list][*] Fixed cl_autowepswitch setting not being respected after respawning\n[*] Fixed "cl_autowepswitch 1" causing the crowbar to be auto-equipped after spawning\n[*] Fixed viewdemo command crashing for certain demo files\n[*] Security fix to client disconnect handling\n[*] Security fixes to console command handling\n[*] Security fix to client/server communications\n[*] Security fix to model loading\n[*] Security fixes to BSP loading\n[*] Added "Leave game" menu option when in a single-player game to exit back to the main menu\n[*] Setting cl_autowepswitch to 2 will now enable auto weapon switching on pickup of a better weapon except when holding Primary or Seconday attack\n[/list]\n\n[h3]Note: This was updated with additional changes:[/h3][list][*] Security fix to client launching\n[*] Security fix to sound file verification\n[/list]',
            feedlabel: "Community Announcements",
            date: 1597791076,
            feedname: "steam_community_announcements",
            feed_type: 1,
            appid: 70,
            tags: ["patchnotes"],
          },
          {
            gid: "3664194214735952702",
            title:
              "Half-Life: Absolute Zero mimics Half-Life's original vibe, run on Linux with Xash3D FWGS",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/GamingOnLinux/3664194214735952702",
            is_external_url: true,
            author: "",
            contents:
              '<p><p>The original Half-Life turned out to look and feel rather different than what originally shown before release. This fan project seeks to give players a different experience more inline with that original design.</p><p><img src="https://www.gamingonlinux.com/uploads/articles/tagline_images/342557262id17256gol.jpg" alt /></p></p>',
            feedlabel: "GamingOnLinux",
            date: 1596460109,
            feedname: "GamingOnLinux",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "3516698970142964433",
            title:
              "Five cool things we learned from Valve's Half-Life: Alyx – Final Hours documentary",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/rps/3516698970142964433",
            is_external_url: true,
            author: "contact@rockpapershotgun.com (Imogen Beckhelling)",
            contents:
              '<p><a href="https://assets.rockpapershotgun.com/images/2020/07/g-man-half-life.jpg"><img src="https://assets.rockpapershotgun.com/images/2020/07/g-man-half-life.jpg" alt="" width="1600" height="900" class="alignnone size-full wp-image-859689" title=""></a></p>\n<p>I&rsquo;ve only ever played bits and pieces of the Half-Life games, but it&rsquo;s been a delight learning the ins and outs of their creation from <a href="https://www.rockpapershotgun.com/game/half-life-alyx-final-hours/">Half-Life: Alyx – Final Hours</a>. It&rsquo;s a multimedia documentary on all things Valve – <a href="https://www.rockpapershotgun.com/2020/07/10/valves-list-of-cancelled-games-includes-a-dark-souls-like-rpg-a-new-left-4-dead-and-half-life-3/">their (many) cancelled games</a>, a close look at life during Alyx&rsquo;s development, and the ups and downs the developers went through in making sure Half-Life returned in the best way possible. I&rsquo;ve pulled out some of my favourite snippets of info from the doc, so read on to hear all about Alyx&rsquo;s invisible headcrab, and why I now believe that G-Man&rsquo;s actor might actually be G-Man in real life.</p>\n<p> <a href="https://www.rockpapershotgun.com/2020/07/13/five-cool-things-we-learned-from-valves-half-life-alyx-final-hours-documentary/#more-859687" class="more-link"><span aria-label="Continue reading Five cool things we learned from Valve&rsquo;s Half-Life: Alyx – Final Hours documentary">(more&hellip;)</span></a></p>\n',
            feedlabel: "Rock, Paper, Shotgun",
            date: 1594653348,
            feedname: "rps",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "3444639924522264508",
            title: "The 9 worst scientists in PC games",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/rps/3444639924522264508",
            is_external_url: true,
            author: "contact@rockpapershotgun.com (Brendan Caldwell)",
            contents:
              '<p><a href="https://assets.rockpapershotgun.com/images/2020/06/worst-scientists-list-mordin-mass-effect-2-4.jpg"><img src="https://assets.rockpapershotgun.com/images/2020/06/worst-scientists-list-mordin-mass-effect-2-4.jpg" alt="" width="1133" height="638" class="alignleft size-full wp-image-852577" title=""></a></p>\n<aside><em><a href="https://www.rockpapershotgun.com/tag/one-off-the-list/">One Off The List</a> is our weekly list feature. Is there something you think doesn&rsquo;t deserve to be on this list? Comment with your reasons why, and next week it may be struck off.</em></aside>\n<p>Science, the most difficult of the arts. We are trained from toddlerhood to respect and fear the products of scientific advancement, such as the selfie sticks or mechanical pencil. The unsurpassed boffins who create such devices are worthy of admiration. But there is one realm in which science is not such a gentle guardian of the people. That&rsquo;s right, it&rsquo;s videogames. In games, scientists are treacherous, evil, stupid, murderous or some genetic concoction of all the above. Here are the 9 worst scientists in PC games.</p>\n<p> <a href="https://www.rockpapershotgun.com/2020/07/03/the-9-worst-scientists-in-pc-games/#more-852511" class="more-link"><span aria-label="Continue reading The 9 worst scientists in PC games">(more&hellip;)</span></a></p>\n',
            feedlabel: "Rock, Paper, Shotgun",
            date: 1593763243,
            feedname: "rps",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "4742798964242715716",
            title: "Experimental Half-Life rave album Panopticon is out today",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/rps/4742798964242715716",
            is_external_url: true,
            author: "contact@rockpapershotgun.com (Natalie Clayton)",
            contents:
              '<p><a href="https://assets.rockpapershotgun.com/images/2018/11/04_half-life1.jpg"><img src="https://assets.rockpapershotgun.com/images/2018/11/04_half-life1.jpg" alt="" width="2557" height="1437" class="alignnone size-full wp-image-614441" title=""></a></p>\n<p>Earlier this week, Alice O pointed out the work of Graham Dunning, an artist who <a href="https://www.rockpapershotgun.com/2020/05/12/this-artist-uses-half-life-to-generate-experimental-dance-music/">creates improvised dance music in Half-Life</a> by replacing the game&rsquo;s audio with clips from 90s rave tracks and sample CDs. Now, Twitch isn&rsquo;t known for being the greatest music-streaming platform about, so this weekend Dunning released Panopticon – a moody album of experimental noise arranged in Valve&rsquo;s seminal 1998 shooter.</p>\n<p> <a href="https://www.rockpapershotgun.com/2020/05/16/experimental-half-life-rave-album-panopticon-is-out-today/#more-832805" class="more-link"><span aria-label="Continue reading Experimental Half-Life rave album Panopticon is out today">(more&hellip;)</span></a></p>\n',
            feedlabel: "Rock, Paper, Shotgun",
            date: 1589622955,
            feedname: "rps",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "3110243741291103217",
            title:
              "This artist uses Half-Life to generate experimental dance music",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/rps/3110243741291103217",
            is_external_url: true,
            author: "contact@rockpapershotgun.com (Alice O'Connor)",
            contents:
              '<p><a href="https://assets.rockpapershotgun.com/images/2020/05/gordon-rave-e.jpg"><img src="https://assets.rockpapershotgun.com/images/2020/05/gordon-rave-e.jpg" alt="" width="1212" height="682" class="aligncenter size-full wp-image-830579" title=""></a></p>\n<p>I&rsquo;ve just watched an experimental dance music gig created by an artist playing <a href="https://www.rockpapershotgun.com/game/half-life/">Half-Life</a>. Graham Dunning has replaced every single sound in Valve&rsquo;s shooter with samples he says come &ldquo;from 90s rave tracks and sample CDs&rdquo;, giving Gordon Freeman drums for feet, making sentry turrets loop vocal samples, turning ambient sounds into pounding loops, blasting drum breaks out guns, and all that. So he creates improvised music just by playing the game. He performed for two hours today on Twitch and it is: so good. Come see today&rsquo;s show!</p>\n<p> <a href="https://www.rockpapershotgun.com/2020/05/12/this-artist-uses-half-life-to-generate-experimental-dance-music/#more-830545" class="more-link"><span aria-label="Continue reading This artist uses Half-Life to generate experimental dance music">(more&hellip;)</span></a></p>\n',
            feedlabel: "Rock, Paper, Shotgun",
            date: 1589287423,
            feedname: "rps",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "2978509755360721999",
            title:
              "Now Play This livestreamed virtual field trips and hiking tours last weekend",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/rps/2978509755360721999",
            is_external_url: true,
            author: "contact@rockpapershotgun.com (Lauren Morton)",
            contents:
              '<p><img class="alignnone size-full wp-image-571239" src="https://assets.rockpapershotgun.com/images/2018/07/Screenshot_2-3.jpg" alt="" width="1369" height="770" title=""></p><p>As with many other events in the year of <a href="https://www.rockpapershotgun.com/tag/coronavirus/">Covid-19</a>, Now Play This&mdash;the yearly exhibition on experimental game design&mdash;transitioned to a virtual space last weekend. Although not every planned part of the exhibition could be shown off in the new format, they still appeared to get up to some neat stuff that you can now watch back yourself. Game designer&nbsp;Gareth Damian Martin took players on a photography hiking trip in <a href="https://www.rockpapershotgun.com/game/no-mans-sky/">No Man&rsquo;s Sky</a> while Robert Yang leads a tour of <a href="https://www.rockpapershotgun.com/game/half-life/">Half-Life</a> by way of the Sven Co-op mod.</p><p> <a href="https://www.rockpapershotgun.com/2020/04/06/now-play-this-livestreamed-virtual-field-trips-and-hiking-tours-last-weekend/#more-815269" class="more-link"><span aria-label="Continue reading Now Play This livestreamed virtual field trips and hiking tours last weekend">(more&hellip;)</span></a></p>\n',
            feedlabel: "Rock, Paper, Shotgun",
            date: 1586195878,
            feedname: "rps",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "2978509755355901637",
            title:
              "Record-breaking Half-Life speedrun briefly trades crowbars for lightsabers",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/rps/2978509755355901637",
            is_external_url: true,
            author: "contact@rockpapershotgun.com (Natalie Clayton)",
            contents:
              '<p><a href="https://assets.rockpapershotgun.com/images/2018/11/04_half-life1.jpg"><img src="https://assets.rockpapershotgun.com/images/2018/11/04_half-life1.jpg" alt="" width="2557" height="1437" class="alignnone size-full wp-image-614441" title=""></a></p><p><a href="https://www.rockpapershotgun.com/game/half-life/">Half Life</a>&lsquo;s introduction is famously slow. Long tram rides and lengthy speeches from co-workers preparing Gordon Freeman for an experiment that would destroy the world. An atmospheric start, for sure, but it&rsquo;s a pain for folks trying to beat the game as quickly as possible. For one speedrunner, though, those dead minutes aren&rsquo;t an obstacle &ndash; they&rsquo;re the perfect opportunity to start practising for a record-breaking Star Wars run.</p><p> <a href="https://www.rockpapershotgun.com/2020/04/05/record-breaking-half-life-speedrun-briefly-trades-crowbars-for-lightsabers/#more-814735" class="more-link"><span aria-label="Continue reading Record-breaking Half-Life speedrun briefly trades crowbars for lightsabers">(more&hellip;)</span></a></p>\n',
            feedlabel: "Rock, Paper, Shotgun",
            date: 1586082100,
            feedname: "rps",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "2984138620244986887",
            title:
              "We talk Half-Life: Alyx with Valve in the meanest interview ever",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/rps/2984138620244986887",
            is_external_url: true,
            author: "contact@rockpapershotgun.com (Katharine Castle)",
            contents:
              '<p><img src="https://assets.rockpapershotgun.com/images/2019/11/half-life-alyx-i-1212x682.jpg/RPSS/resize/690x-1/format/jpg//RPSS/resize/670x-1/format/jpg/" width="670" />\n<img src="https://assets.rockpapershotgun.com/images/2019/11/half-life-alyx-citadel-2160p-1212x682.jpg/RPSS/resize/690x-1/format/jpg//RPSS/resize/670x-1/format/jpg/" width="670" />\n<img src="https://assets.rockpapershotgun.com/images/2019/11/half-life-alyx-combine-elevator-2160p-1212x682.jpg/RPSS/resize/690x-1/format/jpg//RPSS/resize/670x-1/format/jpg/" width="670" />\n<img src="https://assets.rockpapershotgun.com/images/2020/03/hl-alyx-10-1212x682.jpg/RPSS/resize/690x-1/format/jpg//RPSS/resize/670x-1/format/jpg/" width="670" /></p>\n<p>It&#8217;s taken 13 years, but we finally have a new Half-Life game. It may not be the long-awaited Half-Life 3, but as you&#8217;ve probably seen from our <a href="https://www.rockpapershotgun.com/2020/03/23/half-life-alyx-review/" rel="noopener" target="_blank">Half-Life: Alyx review</a>, Valve&#8217;s first foray into virtual reality shows they&#8217;re a developer that are still very much at the top of their game. But <a href="https://www.rockpapershotgun.com/game/half-life-alyx" rel="noopener" target="_blank">Half-Life: Alyx</a> isn&#8217;t just the work of a talented team of developers. It&#8217;s a game that&#8217;s ultimately been shaped by the people who have played it &#8211; the hundreds, if not thousands of playtesters who helped Valve turn their most famous FPS game into a VR sensation. </p>\n<p>To find out more about how Half-Life: Alyx came into being, I sat down with Valve&#8217;s Robin Walker and Jim Hughes a week before the game&#8217;s big release day. We talk about everything from revisiting the Half-Life series and the challenges of bringing it to virtual reality, to what this means for Half-Life 3 as well as just whose idea was it to have headcrabs jumping directly at your face. Some of the answers you&#8217;ll have seen appear on the site over the past week, such as how <a href="https://www.rockpapershotgun.com/2020/03/23/half-life-alyx-playtesters-were-obsessed-with-collecting-stuff/" rel="noopener" target="_blank">playtesters became obsessed with collecting every last thing</a> in sight to <a href="https://www.rockpapershotgun.com/2020/03/24/half-life-alyx-gordon-freeman/" rel="noopener" target="_blank">everyone assuming they were playing as Gordon Freeman</a> until Alyx was finally given a voice, but there&#8217;s plenty more to discover here as we lay out our chat with Robin and Jim in full. Enjoy. </p>\n<p> <a href="https://www.rockpapershotgun.com/2020/03/26/valve-half-life-alyx-interview/#more-809533" class="more-link"><span aria-label="Continue reading We talk Half-Life: Alyx with Valve in &#8220;the meanest interview ever&#8221;">(more&hellip;)</span></a></p>\n',
            feedlabel: "Rock, Paper, Shotgun",
            date: 1585231249,
            feedname: "rps",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "2698159409989042138",
            title:
              "Valve haven't made Half-Life 3 yet because their attempts weren't good enough",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/rps/2698159409989042138",
            is_external_url: true,
            author: "contact@rockpapershotgun.com (Lauren Morton)",
            contents:
              '<p><img src="https://assets.rockpapershotgun.com/images/2020/03/Half-Life-Alyx-wallpaper-crop-1212x682.jpg/RPSS/resize/690x-1/format/jpg//RPSS/resize/670x-1/format/jpg/" width="670" />\n<a href="https://www.rockpapershotgun.com/game/half-life-alyx/">Half-Life: Alyx</a> is out today and, as you&#8217;d hoped, it is good. Graham-certified good, in RPS&#8217;s  <a href="https://www.rockpapershotgun.com/2020/03/23/half-life-alyx-review/">Half-Life Alyx review</a>. For all its goodness, Alyx is not officially <a href="https://www.rockpapershotgun.com/game/half-life-3/">Half-Life 3</a>, which Valve still have not made. There are a few primary reasons that the fabled &#8220;3&#8221; hasn&#8217;t made an appearance, Valve have now explained. Chief among them, they just weren&#8217;t happy with what they came up with.</p>\n<p> <a href="https://www.rockpapershotgun.com/2020/03/23/valve-havent-made-half-life-3-yet-because-their-attempts-werent-good-enough/#more-809011" class="more-link"><span aria-label="Continue reading Valve haven&#8217;t made Half-Life 3 yet because their attempts weren&#8217;t good enough">(more&hellip;)</span></a></p>\n',
            feedlabel: "Rock, Paper, Shotgun",
            date: 1584996031,
            feedname: "rps",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "2579938650945809767",
            title: "Wot I Think: Black Mesa",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/rps/2579938650945809767",
            is_external_url: true,
            author: "contact@rockpapershotgun.com (Graham Smith)",
            contents:
              '<p><img src="https://assets.rockpapershotgun.com/images/2020/03/black-mesa-review-1-1212x682.jpg/RPSS/resize/690x-1/format/jpg//RPSS/resize/670x-1/format/jpg/" width="670" /></p>\n<p>What is the half-life of Half-Life? I would have long ago described Valve&#8217;s first-person shooter as my favourite game, but revisiting it last month in preparation for <a href="https://www.rockpapershotgun.com/game/half-life-alyx/">Half-Life: Alyx</a> made clear how many parts of its design have aged. </p>\n<p>Enter <a href="https://www.rockpapershotgun.com/game/black-mesa/">Black Mesa</a>, a fan-made remake of the original Half-Life, inside Half-Life 2&#8217;s Source engine. Over 8 years since we <a href="https://www.rockpapershotgun.com/2012/09/21/black-mesa-review/">first reviewed its earliest release</a>, the project is now complete. It is a triumph on many levels, and in terms of scale and polish, the most impressive fan game ever made. But it remains, underneath, Half-Life &#8211; with all that that entails.</p>\n<p> <a href="https://www.rockpapershotgun.com/2020/03/11/black-mesa-review-2/#more-802383" class="more-link"><span aria-label="Continue reading Wot I Think: Black Mesa">(more&hellip;)</span></a></p>\n',
            feedlabel: "Rock, Paper, Shotgun",
            date: 1583945155,
            feedname: "rps",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "2579938650927881727",
            title: "Black Mesa is fully launched for real",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/rps/2579938650927881727",
            is_external_url: true,
            author: "contact@rockpapershotgun.com (Lauren Morton)",
            contents:
              '<p><img src="https://assets.rockpapershotgun.com/images/2020/03/black-mesa.jpg/RPSS/resize/690x-1/format/jpg//RPSS/resize/670x-1/format/jpg/" width="670" /></p>\n<p>Long in the works <a href="https://www.rockpapershotgun.com/game/black-mesa/">Black Mesa</a>   the fan-made Half-Life remake   is out. For real. It&#8217;s been in development longer than some folks who might play it today have been alive. Black Mesa 1.0 is now live and officially a graduate from Steam Early Access. From the sounds of it, Crowbar Collective&#8217;s 15-year project is coming out Cum Laude.</p>\n<p> <a href="https://www.rockpapershotgun.com/2020/03/06/black-mesa-is-fully-launched-for-real/#more-801595" class="more-link"><span aria-label="Continue reading Black Mesa is fully launched for real">(more&hellip;)</span></a></p>\n',
            feedlabel: "Rock, Paper, Shotgun",
            date: 1583519437,
            feedname: "rps",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "2578811485610223694",
            title: "Black Mesa will finally launch on March 5",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/rps/2578811485610223694",
            is_external_url: true,
            author: "contact@rockpapershotgun.com (Alice O'Connor)",
            contents:
              '<p><a href="https://assets.rockpapershotgun.com/images/2020/02/black-mesa-crop.jpg"><img src="https://assets.rockpapershotgun.com/images/2020/02/black-mesa-crop.jpg/RPSS/resize/690x-1/format/jpg//RPSS/resize/670x-1/format/jpg/" width="670" /></a></p>\n<p>After fifteen years in development in various forms, <a href="https://www.rockpapershotgun.com/game/black-mesa/">Black Mesa</a> will finally launch in full on March 5. Started as a mod, the Valve-sanctioned remake of Half-Life eventually became its own commercial game and entered early access in May 2015. Since then, they&#8217;ve been working on remaking the much-maligned final chapter of Xen, overhauling and fixing bits, and generally tweaking. Which they&#8217;ve now about finished. A few fixes will follow after that, granted, but the end is oh so close.</p>\n<p> <a href="https://www.rockpapershotgun.com/2020/02/25/black-mesa-will-finally-launch-on-march-5/#more-796267" class="more-link"><span aria-label="Continue reading Black Mesa will finally launch on March 5">(more&hellip;)</span></a></p>\n',
            feedlabel: "Rock, Paper, Shotgun",
            date: 1582644078,
            feedname: "rps",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "2578811485609872111",
            title:
              "It's the simple actions that make Half-Life 1 in VR so convincing",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/rps/2578811485609872111",
            is_external_url: true,
            author: "contact@rockpapershotgun.com (Graham Smith)",
            contents:
              '<p><img src="https://assets.rockpapershotgun.com/images/2020/02/hlvr-header-1212x682.jpg/RPSS/resize/690x-1/format/jpg//RPSS/resize/670x-1/format/jpg/" width="670" /></p>\n<p>A new Half-Life game is only a few weeks away, but it occurred to me that there was no reason to wait for <a href="https://www.rockpapershotgun.com/game/half-life-alyx/">Half-Life: Alyx</a> if I wanted to experience Vortigaunts in VR. I thus spent some time this weekend fussing around Black Mesa in the Valve Index, using a Half-Life 1 VR mod. It&#8217;s impressively feature packed and easy to set up, but it was a simple ladder that sold me.</p>\n<p> <a href="https://www.rockpapershotgun.com/2020/02/25/its-the-simple-actions-that-make-half-life-1-in-vr-so-convincing/#more-796133" class="more-link"><span aria-label="Continue reading It&#8217;s the simple actions that make Half-Life 1 in VR so convincing">(more&hellip;)</span></a></p>\n',
            feedlabel: "Rock, Paper, Shotgun",
            date: 1582635644,
            feedname: "rps",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "2609208878395157461",
            title:
              "This Half-Life mod ran the dialogue and signs through Google Translate until they became nonsense",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/rps/2609208878395157461",
            is_external_url: true,
            author: "contact@rockpapershotgun.com (Alice O'Connor)",
            contents:
              '<p><a href="https://assets.rockpapershotgun.com/images/2020/02/half-life-google-translate-edition.jpg"><img src="https://assets.rockpapershotgun.com/images/2020/02/half-life-google-translate-edition.jpg/RPSS/resize/690x-1/format/jpg//RPSS/resize/670x-1/format/jpg/" width="670" /></a></p>\n<p>You know the cyberjape of running text back and forth through Google Translate in different languages until it comes out as wacky nonsense? Someone has done to that <a href="https://www.rockpapershotgun.com/game/half-life">Half-Life</a>. The new mod Half-Life: Google Translate Edition has garbled Valve&#8217;s game, from changing sign textures through to recording new lines of dialogue. I played a bit (and recorded a wee video) and yeah, I still find this old joke funny enough.</p>\n<p>One scientist hanging with his pal in a corridor casually opines, &#8220;I don&#8217;t think we should hurt everyone.&#8221;</p>\n<p> <a href="https://www.rockpapershotgun.com/2020/02/03/this-half-life-mod-ran-the-dialogue-and-signs-through-google-translate-until-they-became-nonsense/#more-786011" class="more-link"><span aria-label="Continue reading This Half-Life mod ran the dialogue and signs through Google Translate until they became nonsense">(more&hellip;)</span></a></p>\n',
            feedlabel: "Rock, Paper, Shotgun",
            date: 1580743418,
            feedname: "rps",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "2597949245043331091",
            title:
              "The whole Half-Life story is free to play on Steam right now",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/rps/2597949245043331091",
            is_external_url: true,
            author: "contact@rockpapershotgun.com (Alice O'Connor)",
            contents:
              '<p><a href="https://assets.rockpapershotgun.com/images/2020/01/half-life-2-menu-background-b.jpg"><img src="https://assets.rockpapershotgun.com/images/2020/01/half-life-2-menu-background-b.jpg/RPSS/resize/690x-1/format/jpg//RPSS/resize/670x-1/format/jpg/" width="670" /></a></p>\n<p>It has come to my attention that some people have not played the Half-Life games, to which I can only say: mate, I think you might really like it. Valve will soon return to the series after thirteen years with <a href="https://www.rockpapershotgun.com/game/half-life-alyx/">Half-Life: Alyx</a> in March, and ahead of that they&#8217;re inviting everyone to catch up on the story so far. From now until the launch of Alyx, the Half-Life games are free for everyone to play in full on Steam. You know, some of these really are quite good.</p>\n<p> <a href="https://www.rockpapershotgun.com/2020/01/22/the-whole-half-life-story-is-free-to-play-on-steam-right-now/#more-779107" class="more-link"><span aria-label="Continue reading The whole Half-Life story is free to play on Steam right now">(more&hellip;)</span></a></p>\n',
            feedlabel: "Rock, Paper, Shotgun",
            date: 1579692666,
            feedname: "rps",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "3690071589859893994",
            title: "Play Now For Free - Half-Life Series",
            url: "https://store.steampowered.com/news/57848/",
            is_external_url: false,
            author: "Valve",
            contents:
              'Half-Life: Alyx is coming in March, and we are celebrating early by making all games in the Half-Life Series FREE to play for Steam users, from now until the day it launches!<br><br>If you already have Steam installed, you can click the following links to start playing now!  <br><a href=\'steam://run/70\'>Half-Life</a><br><a href=\'steam://run/220\'>Half-Life 2</a><br><a href=\'steam://run/380\'>Half-Life 2: Episode One</a><br><a href=\'steam://run/420\'>Half-Life 2: Episode Two</a><br><br>If you don\'t have Steam, you can download it <a href=\'http://store.steampowered.com/about/\'>here</a>.<br><br>Half-Life: Alyx is set before the events of Half-Life 2 and the episodes, but the games share characters and story elements. The Half-Life: Alyx team believes that the best way to enjoy the new game is to play through the old ones, especially Half-Life 2 and the episodes, so we want to make that as easy as possible.<br><a href="http://store.steampowered.com/app/70/"><img src="https://steamcdn-a.akamaihd.net/steam/apps/70/capsule_467x181.jpg" style=" float: left; margin-right: 12px; height: 181px; width: 467px;"></a><br><a href="http://store.steampowered.com/app/220/"><img src="https://steamcdn-a.akamaihd.net/steam/apps/220/capsule_467x181.jpg" style=" float: left; margin-right: 12px; height: 181px; width: 467px;"></a><br><a href="http://store.steampowered.com/app/380/"><img src="https://steamcdn-a.akamaihd.net/steam/apps/380/capsule_467x181.jpg" style=" float: left; margin-right: 12px; height: 181px; width: 467px;"></a><br><a href="http://store.steampowered.com/app/420/"><img src="https://steamcdn-a.akamaihd.net/steam/apps/420/capsule_467x181.jpg" style=" float: left; margin-right: 12px; height: 181px; width: 467px;"></a>',
            feedlabel: "Announcement",
            date: 1579630500,
            feedname: "steam_announce",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "3690071589859385152",
            title:
              "Half-Life Collection is free-to-play until the launch of Half-Life: Alyx (Updated)",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/pcgamer/3690071589859385152",
            is_external_url: true,
            author: "",
            contents:
              '<p><strong>Update:</strong> And now it&apos;s official: The full Half-Life Collection is, for awhile at least, free to play. &quot;Half-Life: Alyx is coming in March, and we are celebrating early by making all games in the Half-Life Collection FREE to play for Steam users, from now until the day it launches,&quot; Valve said in <a href="https://store.steampowered.com/news/57848/" target="_blank">announcement</a>.</p><p>&quot;Half-Life: Alyx is set before the events of Half-Life 2 and the episodes, but the games share characters and story elements. The Half-Life: Alyx team believes that the best way to enjoy the new game is to play through the old ones, especially Half-Life 2 and the episodes, so we want to make that as easy as possible.&quot;</p><p>The Half-Life Collection includes <a href="https://store.steampowered.com/app/70/HalfLife/" target="_blank">Half-Life</a>, <a href="https://store.steampowered.com/app/220/HalfLife_2/" target="_blank">Half-Life 2</a>, <a href="https://store.steampowered.com/app/380/HalfLife_2_Episode_One/" target="_blank">Half-Life 2: Episode One</a>, and <a href="https://store.steampowered.com/app/420/HalfLife_2_Episode_Two/" target="_blank">Half-Life 2: Episode Two</a>, as well as the spin-off games <a href="https://store.steampowered.com/app/50/HalfLife_Opposing_Force/" target="_blank">Opposing Force</a> and <a href="https://store.steampowered.com/app/130/HalfLife_Blue_Shift/" target="_blank">Blue Shift</a>, and the multiplayer <a href="https://store.steampowered.com/app/20/Team_Fortress_Classic/" target="_blank">Team Fortress Classic</a>.</p><p><strong>Original story:</strong><br></p><p>Some Steam users received a <a href="https://steamcommunity.com/app/546560/discussions/0/3195801972006214597/" target="_blank">notification</a> yesterday that advertised a Half-Life: Alyx event before vanishing. The notification claimed that the Half-Life Collection would be free until the launch of the VR spin-off, except there is no such thing as the Half-Life Collection, and right now all the Half-Life games have prices.&#xA0;</p><p>While there are no bundles known as the Half-Life Collection, there&apos;s The Orange Box and the Half-Life Complete bundles, but neither of them are free. And despite the notification, which links to an <a href="https://steamcommunity.com/games/546560/events/3094470492881722384" target="_blank">error page</a>, Valve hasn&apos;t made any announcements.&#xA0;</p><p>It looks like the notification was sent out too early, but that doesn&apos;t explain why the bundle has a different name. It could simply be a mistake, so the notification could just be referring to Half-Life Complete. It could also be that Valve&apos;s going to release a third bundle, which will eventually contain Half-Life: Alyx.&#xA0;</p><p>I&apos;ve reached out to Valve to find out more about the event, so keep an eye out for updates.&#xA0;</p>',
            feedlabel: "PC Gamer",
            date: 1579617447,
            feedname: "pcgamer",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "2468465044729370323",
            title: "This mod recreates the Half-Life alpha",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/pcgamer/2468465044729370323",
            is_external_url: true,
            author: "",
            contents:
              '<p>Back in 2013 an alpha build of Half-Life called version 0.54, a version first distributed to game journalists in 1997, was released to the public. Its six chapters included one called The Office Warrens, which would eventually evolve into the finished game&apos;s fourth chapter. It served as the inspiration for <a href="https://www.moddb.com/mods/half-life-in-deep/downloads/office-warrens-demo" target="_blank">the In Deep mod</a>, which you can try an early version of now.</p><p>&quot;In Deep takes you through the scrapped version of Half-Life from 1997,&quot; as the description says, &quot;re-imagined and revamped. What awaits you is a surreal, fast-paced, and action-packed journey through the old Labs once again!&quot;</p><p>The mod tweaks the alpha version by simplifying some of its more obtuse puzzles and making the combat feel a bit closer to that of the finished game. It&apos;s Half-Life as it might have been, if some of its early ideas had been polished rather than scrapped and replaced. You can <a href="https://www.moddb.com/mods/half-life-in-deep/downloads/office-warrens-demo" target="_blank">download it from ModDB</a>.</p>',
            feedlabel: "PC Gamer",
            date: 1574653289,
            feedname: "pcgamer",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "2468465044717082825",
            title:
              "Half-Life: Alyx is a VR prequel to HL2, coming in March 2020",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/rps/2468465044717082825",
            is_external_url: true,
            author: "contact@rockpapershotgun.com (Alice O'Connor)",
            contents:
              '<p><a href="https://assets.rockpapershotgun.com/images/2019/11/half-life-alyx-e.jpg"><img src="https://assets.rockpapershotgun.com/images/2019/11/half-life-alyx-e.jpg/RPSS/resize/690x-1/format/jpg//RPSS/resize/670x-1/format/jpg/" width="670" /></a></p>\n<p>Valve today formally announced <a href="https://www.rockpapershotgun.com/game/half-life-alyx">Half-Life: Alyx</a>, a &#8220;full-length&#8221; game exclusively for VR. Half-Life is returning after 12 years, though Gordon Freeman seemingly is not and this isn&#8217;t Half-Life 3. Set between the events of Half-Life and Half-Life 2, this one stars future sidekick Alyx Vance in the years before Gordo&#8217;s return when she and her dad were building the resistance. And yes, this really is only for VR. Come watch the announcement trailer.</p>\n<p> <a href="https://www.rockpapershotgun.com/2019/11/21/half-life-alyx-is-a-vr-prequel-to-hl2-coming-in-march-2020/#more-758977" class="more-link"><span aria-label="Continue reading Half-Life: Alyx is a VR prequel to HL2, coming in March 2020">(more&hellip;)</span></a></p>\n',
            feedlabel: "Rock, Paper, Shotgun",
            date: 1574359215,
            feedname: "rps",
            feed_type: 0,
            appid: 70,
          },
          {
            gid: "3657414904105612622",
            title: "A new Half-Life would have to be VR",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/eurogamer/3657414904105612622",
            is_external_url: true,
            author: "",
            contents:
              "<img src=\"https://d2skuhm0vrry40.cloudfront.net/2019/articles/2019-11-19-09-11/-1574154714009.jpg/EG11/resize/300x-1/format/jpg/2068548.jpg\" alt=\"\"/><p>Like Doc Brown, I once hit my head and saw the future. I didn't come round in the bathroom having the idea for the Flux Capacitor, but I did bonk my noggin pretty hard in the office games room and sit back, dazed but delighted with what had just happened.</p><p>I was playing the Budget Cuts demo on Valve's room-scale VR. Budget Cuts is a game about infiltrating an office that's patrolled with deadly robots. Because of the room-scale VR, you're really there: your actual body is your in-game body. This means that the robots are the same size as you - which is terrifying - and it also means that when you have to duck your head through a missing panel in the floor to look into the room below, you really have to do it. Except that while the game floor might be missing a panel, the real floor isn't. Bonk. I did it. Chris Bratt, who had also played the demo, had done it. A day later, so moved by what I'd played I brought in a friend to try it out. They did it too. We all hit our heads and we all saw the future.</p><p>More than just the future of video games, I really felt like I had seen the future of one series in particular. I still think this. I still think that Budget Cuts is essentially the closest I've ever gotten to playing Half-Life 3. It's not set in the Half-Life universe, although its mixture of horrific technology and the banal and bureaucratic is not a million miles away. It wasn't made by a Valve team, although I gather the people who made it did end up working on the final game at Valve as incubees. Instead, it channels that magical thing that Half-Life has always done.</p><p><a href=\"https://www.eurogamer.net/articles/2019-11-19-a-new-half-life-would-have-to-be-vr\">Read more</a></p>",
            feedlabel: "Eurogamer",
            date: 1574154840,
            feedname: "eurogamer",
            feed_type: 0,
            appid: 50,
          },
          {
            gid: "3657414904104164249",
            title:
              "Valve confirms Half-Life: Alyx, full reveal coming later this week",
            url:
              "https://steamstore-a.akamaihd.net/news/externalpost/pcgamer/3657414904104164249",
            is_external_url: true,
            author: "",
            contents:
              '<p><strong>Update 2: </strong>It&apos;s official, Half-Life: Alyx is happening. Valve&apos;s long-awaited &quot;flagship VR game&quot; will be revealed to the world at 10 am PT/1 pm ET on November 21. The tweet comes from a relatively new account&#x2014;created June 2019&#x2014;with a small number of followers, and this is actually its first tweet. It&apos;s also odd that Valve would make such a big announcement over a channel that so few people were paying attention to. The official <a href="https://twitter.com/steam_games">Steam Twitter feed</a>, to compare, has 5.2 million followers.&#xA0;</p><p>But it&apos;s verified, and the tweet has been retweeted by a few Valve folks, so we&apos;re confident it&apos;s legit: A new communications channel for a &quot;new&quot; kind of Valve, maybe.</p><p>We&apos;ll keep you posted.&#xA0;</p>\n<p><strong>Update:</strong> According to <a href="https://docs.google.com/document/d/1T7Dke__WLzyTzDg1omSrSzy5alzbUhsC8kZZ8anAhqk/edit">a new transcript of the leaked interview</a>, Half-Life: Alyx will be shown at The Game Awards on December 12.</p><p><strong>Original story:</strong> This November 19 will mark the 21st anniversary of the release of the original Half-Life, and according to rumor it will also be when Valve announce a flagship virtual reality game called Half-Life: Alyx.</p><p>Valve are rarely interested in celebrating their own game&apos;s anniversaries, so take this rumor with a mouthful of salt. The source is apparently the same leaker responsible for the <a href="https://www.pcgamer.com/dota-underlords-early-access-footage-leaked/" target="_blank">DOTA Underlords leak</a>, and is quoting from <a href="https://pastebin.com/9rjrw8nC" target="_blank">an interview</a> between &quot;Geoff&quot; (Geoff Keighley, in his capacity as the creator of the &quot;Final Hours&quot; documentaries about Valve games), Robin Walker (co-developer of Team Fortress 2 among other games), and an unnamed third person.</p><p>&quot;March 2020, &quot;Half-Life: Alyx&quot; comin&apos; out&quot;, says Geoff in the transcript.</p><p>Responding to the question of whether this game would be available for players without VR headsets, &quot;I mean we would love to be delivering a version of this that you could play with a mouse and a keyboard, but like as we said, it began as an exploration of VR,&quot; an unnamed person replies.</p><p>As for how this entirely hypothetical game would play, the only clue is this statement: &quot;You can see their whole body-- Respond to the situation. You know, panicking, dropping clips on the ground as they fumble their weapons &apos;cause a zombie&apos;s in front of them, all these things, they&apos;re just - it&apos;s been really fun watching playtests.&quot;</p><p><a href="https://www.pcgamer.com/valve-vr-game/" target="_blank">Valve have said they&apos;ll be releasing a &quot;flagship VR game&quot; this year</a>.</p><p>I&apos;ve reached out to Valve for comment and will update this story if they reply.</p>',
            feedlabel: "PC Gamer",
            date: 1574120233,
            feedname: "pcgamer",
            feed_type: 0,
            appid: 70,
          },
        ],
        count: 399,
      },
    });

    console.log("날짜", new Date(1613231668 * 1000).toISOString().slice(0, 10));

    // axios
    //   .get("https://steamcommunity.com/id/emperor_jordan/?xml=1")
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    const urlMetadata = require("url-metadata");
    urlMetadata("http://bit.ly/2ePIrDy").then(
      function (metadata) {
        // success handler
        console.log(metadata);
      },
      function (error) {
        // failure handler
        console.log(error);
      }
    );
  }, []);
  return (
    <div>
      <p>
        <strong>Update 2: </strong>It&apos;s official, Half-Life: Alyx is
        happening. Valve&apos;s long-awaited &quot;flagship VR game&quot; will
        be revealed to the world at 10 am PT/1 pm ET on November 21. The tweet
        comes from a relatively new account&#x2014;created June 2019&#x2014;with
        a small number of followers, and this is actually its first tweet.
        It&apos;s also odd that Valve would make such a big announcement over a
        channel that so few people were paying attention to. The official{" "}
        <a href="https://twitter.com/steam_games">Steam Twitter feed</a>, to
        compare, has 5.2 million followers.&#xA0;
      </p>
      <p>
        But it&apos;s verified, and the tweet has been retweeted by a few Valve
        folks, so we&apos;re confident it&apos;s legit: A new communications
        channel for a &quot;new&quot; kind of Valve, maybe.
      </p>
      <p>We&apos;ll keep you posted.&#xA0;</p>\n
      <p>
        <strong>Update:</strong> According to{" "}
        <a href="https://docs.google.com/document/d/1T7Dke__WLzyTzDg1omSrSzy5alzbUhsC8kZZ8anAhqk/edit">
          a new transcript of the leaked interview
        </a>
        , Half-Life: Alyx will be shown at The Game Awards on December 12.
      </p>
      <p>
        <strong>Original story:</strong> This November 19 will mark the 21st
        anniversary of the release of the original Half-Life, and according to
        rumor it will also be when Valve announce a flagship virtual reality
        game called Half-Life: Alyx.
      </p>
      <p>
        Valve are rarely interested in celebrating their own game&apos;s
        anniversaries, so take this rumor with a mouthful of salt. The source is
        apparently the same leaker responsible for the{" "}
        <a
          href="https://www.pcgamer.com/dota-underlords-early-access-footage-leaked/"
          target="_blank"
        >
          DOTA Underlords leak
        </a>
        , and is quoting from{" "}
        <a href="https://pastebin.com/9rjrw8nC" target="_blank">
          an interview
        </a>{" "}
        between &quot;Geoff&quot; (Geoff Keighley, in his capacity as the
        creator of the &quot;Final Hours&quot; documentaries about Valve games),
        Robin Walker (co-developer of Team Fortress 2 among other games), and an
        unnamed third person.
      </p>
      <p>
        &quot;March 2020, &quot;Half-Life: Alyx&quot; comin&apos; out&quot;,
        says Geoff in the transcript.
      </p>
      <p>
        Responding to the question of whether this game would be available for
        players without VR headsets, &quot;I mean we would love to be delivering
        a version of this that you could play with a mouse and a keyboard, but
        like as we said, it began as an exploration of VR,&quot; an unnamed
        person replies.
      </p>
      <p>
        As for how this entirely hypothetical game would play, the only clue is
        this statement: &quot;You can see their whole body-- Respond to the
        situation. You know, panicking, dropping clips on the ground as they
        fumble their weapons &apos;cause a zombie&apos;s in front of them, all
        these things, they&apos;re just - it&apos;s been really fun watching
        playtests.&quot;
      </p>
      <p>
        <a href="https://www.pcgamer.com/valve-vr-game/" target="_blank">
          Valve have said they&apos;ll be releasing a &quot;flagship VR
          game&quot; this year
        </a>
        .
      </p>
      <p>
        I&apos;ve reached out to Valve for comment and will update this story if
        they reply.
      </p>
    </div>
  );
}
