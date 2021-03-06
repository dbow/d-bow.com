import css from './work.css';

import React from 'react';


export default () => (
  <div>
    <div className={css.work}>
      <div className={css.tale}></div>
      <div className={css.text}>
        <h4 className={css.h4}><a href="http://www.talepresents.com/">Tale</a></h4>
        <p className={css.p}>A graph-based CMS for <a href="http://www.talepresents.com/shinyshinysocks/8498a545e112/the-tale-of-tale#/1">non-linear, interactive storytelling</a> with a card-based, mobile-friendly UI that preserves history as you navigate complex narratives. [<a href="http://www.talepresents.com/dbow/0027d0f86e48/on-ephemera-or-the-bittersweet#/1">Example story</a>]
        </p>
      </div>
    </div>
    <div className={css.work}>
      <div className={css.livinglossures}></div>
      <video className={css.video} autoPlay loop preload="none">
        <source type="video/mp4" src="/videos/HOME01.mp4"></source>
        <source type="video/webm" src="/videos/HOME01.webmhd.webm"></source>
      </video>
      <div className={css.text}>
        <h4 className={css.h4}><a href="http://shots.lossur.es/#/0001">Living Los Sures</a></h4>
        <p className={css.p}>An expansive documentary project about the Southside neighborhood of Williamsburg, Brooklyn, <a href="http://www.filmlinc.com/nyff2014/films/los-sures">featured at the NY Film Festival</a>. A rich, immersive interface for multi-media annotations of a film, shot by shot. [<a href="https://github.com/dbow/shotbyshot">source</a> and <a href="https://github.com/dbow/media-marginalia">source</a>]</p>
      </div>
    </div>
    <div className={css.work}>
      <div className={css.chartbeat}></div>
      <div className={css.text}>
        <h4 className={css.h4}><a href="http://www.chartbeat.com">Chartbeat</a></h4>
        <p className={css.p}><a href="http://blog.chartbeat.com/2014/09/29/chartbeat-receives-mrc-accreditation-21-metrics/">MRC-accredited attention metrics technology</a>, an embedded script downloaded 1 billion times a day into the sites of 80% of the top US publishers, including The New York Times, The Wall Street Journal, ESPN, and CNN. Plus <a href="https://chartbeat.com/personal/test-drive/">dashboards</a>, <a href="https://chartbeat.com/labs/rising/">experiments</a>, and some <a href="http://blog.chartbeat.com/2013/06/18/sound-and-color-data-as-art/">other stuff</a>.</p>
      </div>
    </div>
    <div className={css.work}>
      <div className={css.soundquake}></div>
      <div className={css.text}>
        <h4 className={css.h4}><a href="http://soundquake.d-bow.com">soundQuake</a></h4>
        <p className={css.p}><a href="http://grayarea.org/showcase-entry/soundquake/">Winning piece</a> from <a href="http://thecreatorsproject.vice.com/blog/art-hack-weekend-san-francisco-a-html5-webgl-hackathon">Art Hack SF</a> and featured at <a href="http://thecreatorsproject.com/events/the-creators-project-san-francisco-2012">the Creator's Project SF</a>. Turns data sets into meditative audio/visual experiences. [<a href="https://github.com/dbow/soundquake">source</a>]</p>
      </div>
    </div>
    <div className={css.work}>
      <div className={css.text}>
        <h4 className={css.h4}><a href="http://www.kanyezone.com/">Kanye Zone</a></h4>
        <p className={css.p}>A <a href="http://www.reddit.com/r/Music/comments/qpwqe/dont_let_kanye_into_his_zone/">viral game</a> written up by <a href="http://www.huffingtonpost.com/2012/03/12/kanye-zone-kanye-west-jay-z_n_1339203.html">huffpo</a>, <a href="http://read.mtvhive.com/2012/03/27/spitz-take-kanye-zone-interview/">mtv</a>, <a href="http://pitchfork.tumblr.com/post/19132634016/welcome-to-kanye-zone-the-simple-yet-effective">pitchfork</a>, <a href="http://kotaku.com/kanye-zone">kotaku</a>, and others.</p>
      </div>
      <div className={css.kanyezone}></div>
    </div>
    <div className={css.work}>
      <div className={css.projectopen}></div>
      <div className={css.text}>
        <h4 className={css.h4}><a href="http://www.projectopensf.org">projectOPEN</a></h4>
        <p className={css.p}>Enables organizations supporting the homeless in San Francisco to create and print custom maps of open resources in the city. [<a href="https://github.com/dbow/Project-OPEN">source</a>].</p>
      </div>
    </div>
  </div>
);


