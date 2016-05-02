import css from './music.css';

import React from 'react';


export default () => (
  <div>
    <div className={css.music}>
      <div className={css.container}>
        <img className={css.img} src="/images/creeps.jpg" />
        <h4 className={css.h4}>
          <a href="https://carcreeps.bandcamp.com/">
            Car Creeps - S/T (2013)
          </a>
        </h4>
      </div>
      <div className={css.item}>
        Car Creeps was born in the spring of 2010 and died shortly thereafter. They almost played a show once, but the venue shut down before the show could happen.
      </div>
      <div className={css.item}>
        <iframe style={{border: 0, width: '100%', height: '241px'}} src="https://bandcamp.com/EmbeddedPlayer/album=757783275/size=large/bgcol=ffffff/linkcol=ff0074/artwork=none/transparent=true/" seamless><a href="http://carcreeps.bandcamp.com/album/car-creeps">Car Creeps by Car Creeps</a></iframe>
      </div>
    </div>
    <div className={css.music}>
      <div className={css.container}>
        <img className={css.img} src="/images/majic.jpg" />
        <h4 className={css.h4}>
          <a href="http://lcmrrecords.com/themagiceyes.html">
            The Majic Eyes - S/T (2009)
          </a>
        </h4>
      </div>
      <div className={css.item}>
        <audio controls preload="metadata">
          <source src="/audio/themagiceyes_-_07_-_its_time_to_go.mp3" type="audio/mp3" />
          Your browser does not support the <code>audio</code> element.
        </audio>
      </div>
      <div className={css.item}>
        <a href="http://eggyrecords.blogspot.nl/2009/09/these-are-three-latest-releases-from.html">Released by Eggy Records</a>
        <div className={css.quote}>"...This tape is the debut of his bedroom psych-pop project Majic Eyes. The territory here is the hazy pop of prime Elephant 6 -- weird, blown out sounds, solid pop songs, strange, sometimes disturbing, lyrics. What really stands out is the simplicity of these songs, and the stripped-down arrangements make the sturdiness of the song-writing apparent. Adorned with restraint, the simple, home-made percussion, odd synthesizer noise and doubled-up vocals buttress the songs in the right places without weighing them down. Eggy Records is very proud to be introducing this music to a larger audience."</div>
      </div>
      <div className={css.item}>
        <a href="http://cassettegods.blogspot.nl/2009/12/majic-eyes-st-c20-eggy-records.html">Reviewed by Cassette Gods</a>
        <div className={css.quote}>"That’s definitely the quickest identifier of this music, simple chord progressions, ultra bright bass sounds, sometimes blown-out yet subtle recording, it’s like he heard the Neutral Milk Hotel records and said, “well, I don’t have a whole bunch of people who know how to play exotic horns or anything that can help me out with this, so I guess I’ll just do it myself”. And that he did, a really impressive and vivid album was made in this guy’s bedroom, for the first seven tracks, that is. The last is an extra long rambler outdoors (aptly titled “a midafternoon walk on prince to broadway in summer”), a real pleasant way to close this short introduction to something you can probably expect to hear a lot more about in the future. If this is your bag, definitely climb in."</div>
      </div>
    </div>
    <div className={css.music}>
      <div className={css.container}>
        <img className={css.img} src="/images/ohiotapes.jpg" />
        <h4 className={css.h4}>
          <a href="https://soundcloud.com/dbow1234/sets/yar-ohio-tapes">
            Yar - The Ohio Tapes (2013)
          </a>
        </h4>
      </div>
      <div className={css.item}>
        <iframe width="100%" height="166" scrolling="no" frameBorder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/79998233&amp;color=ff0074&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
      </div>
      <div className={css.item}>
        Three songs by three people, recorded in Grafton, Ohio on a TASCAM Portastudio 424 MKII
      </div>
    </div>
  </div>
);
