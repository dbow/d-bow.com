function WorkItem({ image, title, href, video, children }) {
  return (
    <div className="relative overflow-hidden bg-black my-[70px] min-h-[300px] p-[30px] first:mt-[30px]">
      <div
        className="absolute w-[110%] h-[110%] -left-[5%] -top-[5%] blur-[5px] bg-cover bg-top bg-no-repeat z-0"
        style={{ backgroundImage: `url(/images/${image})` }}
      />
      {video && (
        <video
          className="absolute left-0 top-0 h-full"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        >
          {video.map(({ src, type }) => (
            <source key={src} src={src} type={type} />
          ))}
        </video>
      )}
      <div className="relative p-5 z-[2] max-[615px]:p-0">
        <h4 className="inline m-0 text-[40px] max-[615px]:text-[30px] text-white bg-[rgba(255,0,116,0.75)] leading-[1em]">
          <a href={href} className="text-white font-normal p-[10px] tracking-[-0.01em] hover:text-white">
            {title}
          </a>
        </h4>
        <p className="bg-white p-[10px]">{children}</p>
      </div>
    </div>
  )
}

export default function Work() {
  return (
    <div>
      <WorkItem image="tale.png" title="Tale" href="http://www.talepresents.com/">
        A graph-based CMS for <a href="http://www.talepresents.com/shinyshinysocks/8498a545e112/the-tale-of-tale#/1">non-linear, interactive storytelling</a> with a card-based, mobile-friendly UI that preserves history as you navigate complex narratives. [<a href="http://www.talepresents.com/dbow/0027d0f86e48/on-ephemera-or-the-bittersweet#/1">Example story</a>]
      </WorkItem>

      <WorkItem
        image="livinglossures.png"
        title="Living Los Sures"
        href="http://shots.lossur.es/#/0001"
        video={[
          { src: '/videos/HOME01.mp4', type: 'video/mp4' },
          { src: '/videos/HOME01.webmhd.webm', type: 'video/webm' },
        ]}
      >
        An expansive documentary project about the Southside neighborhood of Williamsburg, Brooklyn, <a href="http://www.filmlinc.com/nyff2014/films/los-sures">featured at the NY Film Festival</a>. A rich, immersive interface for multi-media annotations of a film, shot by shot. [<a href="https://github.com/dbow/shotbyshot">source</a> and <a href="https://github.com/dbow/media-marginalia">source</a>]
      </WorkItem>

      <WorkItem image="chartbeat.png" title="Chartbeat" href="http://www.chartbeat.com">
        <a href="http://blog.chartbeat.com/2014/09/29/chartbeat-receives-mrc-accreditation-21-metrics/">MRC-accredited attention metrics technology</a>, an embedded script downloaded 1 billion times a day into the sites of 80% of the top US publishers, including The New York Times, The Wall Street Journal, ESPN, and CNN. Plus <a href="https://chartbeat.com/personal/test-drive/">dashboards</a>, <a href="https://chartbeat.com/labs/rising/">experiments</a>, and some <a href="http://blog.chartbeat.com/2013/06/18/sound-and-color-data-as-art/">other stuff</a>.
      </WorkItem>

      <WorkItem image="soundquake.png" title="soundQuake" href="http://soundquake.d-bow.com">
        <a href="http://grayarea.org/showcase-entry/soundquake/">Winning piece</a> from <a href="http://thecreatorsproject.vice.com/blog/art-hack-weekend-san-francisco-a-html5-webgl-hackathon">Art Hack SF</a> and featured at <a href="http://thecreatorsproject.com/events/the-creators-project-san-francisco-2012">the Creator's Project SF</a>. Turns data sets into meditative audio/visual experiences. [<a href="https://github.com/dbow/soundquake">source</a>]
      </WorkItem>

      <WorkItem image="kanyezone.png" title="Kanye Zone" href="http://www.kanyezone.com/">
        A <a href="http://www.reddit.com/r/Music/comments/qpwqe/dont_let_kanye_into_his_zone/">viral game</a> written up by <a href="http://www.huffingtonpost.com/2012/03/12/kanye-zone-kanye-west-jay-z_n_1339203.html">huffpo</a>, <a href="http://read.mtvhive.com/2012/03/27/spitz-take-kanye-zone-interview/">mtv</a>, <a href="http://pitchfork.tumblr.com/post/19132634016/welcome-to-kanye-zone-the-simple-yet-effective">pitchfork</a>, <a href="http://kotaku.com/kanye-zone">kotaku</a>, and others.
      </WorkItem>

      <WorkItem image="projectopen.png" title="projectOPEN" href="http://www.projectopensf.org">
        Enables organizations supporting the homeless in San Francisco to create and print custom maps of open resources in the city. [<a href="https://github.com/dbow/Project-OPEN">source</a>].
      </WorkItem>
    </div>
  )
}
