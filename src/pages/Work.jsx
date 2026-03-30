import { useTheme } from '../context/ThemeContext.jsx'

function WorkItem({ image, title, href, video, children }) {
  const { theme } = useTheme()
  return (
    <div className="relative overflow-hidden bg-black my-[70px] max-[615px]:my-[40px] min-h-[300px] max-[615px]:min-h-[200px] p-[30px] max-[615px]:py-[50px] first:mt-[30px]">
      <div
        className="absolute w-[110%] h-[110%] -left-[5%] -top-[5%] blur-[5px] bg-cover bg-top bg-no-repeat z-0"
        style={{ backgroundImage: `url(/images/${image})` }}
      />
      {video && (
        <video
          className="absolute w-[110%] h-[110%] -left-[5%] -top-[5%] object-cover blur-[5px]"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster={`/images/${image}`}
        >
          {video.map(({ src, type }) => (
            <source key={src} src={src} type={type} />
          ))}
        </video>
      )}
      <div className="relative p-5 z-[2] max-[615px]:p-0">
        <h4
          className="inline m-0 text-[40px] max-[615px]:text-[30px] leading-[1em]"
          style={{ background: theme === 'light' ? 'rgba(232,221,208,0.85)' : 'rgba(49,66,60,0.85)' }}
        >
          <a
            href={href}
            style={{ color: theme === 'light' ? '#222' : 'white' }}
            className="font-normal p-[10px] tracking-[-0.01em]"
          >
            {title}
          </a>
        </h4>
        <p
          className="p-[10px]"
          style={{ background: theme === 'light' ? 'rgba(232,221,208,0.88)' : 'rgba(41,40,34,0.88)' }}
        >{children}</p>
      </div>
    </div>
  )
}

export default function Work() {
  return (
    <div>
      <WorkItem image="TwitterBlueUSRolloutAdFreeArticlesHero.jpg" title="Ad-free Articles" href="https://blog.x.com/en_us/topics/product/2021/twitter-smarter--twitter-harder-with-twitter-blue">
        A premium feature of <a href="https://blog.x.com/en_us/topics/company/2021/introducing-twitter-blue">Twitter's subscription service</a> providing the ability to read <a href="https://www.nytimes.com/2021/11/09/technology/twitter-blue-news-articles.html">ad-free articles</a> from <a href="https://www.adweek.com/media/twitter-blue-how-to-browse-ad-free-articles/">more than 300 publishers in the U.S.</a>
      </WorkItem>

      <WorkItem
        image="scroll-poster.png"
        title="Scroll"
        href="https://en.wikipedia.org/wiki/Scroll_(web_service)"
        video={[
          { src: '/videos/scroll.mp4', type: 'video/mp4' },
          { src: '/videos/scroll.webm', type: 'video/webm' },
        ]}
      >
        A subscription service (or <a href="https://www.theverge.com/2020/1/29/21113003/scroll-subscription-service-publisher-web-cookie-hack">ingenious web technology hack</a>) to an ad-free, magical internet for users and a <a href="https://www.usatoday.com/story/money/2020/01/28/scroll-ad-free-journalism-news/4586551002/">sustainable business model</a> for publishers.
      </WorkItem>

      <WorkItem image="screenslate-desktop.png" title="Screen Slate" href="https://web.archive.org/web/20161007235848/http://www.screenslate.com/about">
        A complete redesign of the web application for Screen Slate, <a href="https://www.villagevoice.com/qa-jon-dieringer-talks-founding-screen-slate-and-new-york-moviegoing/">a resource for daily listings and editorial commentary</a> on New York City moving image culture.
      </WorkItem>

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
        An expansive documentary project about the Southside neighborhood of Williamsburg, Brooklyn, <a href="https://www.filmlinc.org/films/los-sures/">featured at the NY Film Festival</a>. A rich, immersive interface for multi-media annotations of a film, shot by shot. [<a href="https://github.com/dbow/shotbyshot">source</a> and <a href="https://github.com/dbow/media-marginalia">source</a>]
      </WorkItem>

      <WorkItem image="chartbeat.png" title="Chartbeat" href="http://www.chartbeat.com">
        <a href="https://chartbeat.com/resources/press/chartbeat-receives-mrc-accreditation-21-metrics/">MRC-accredited attention metrics technology</a>, an embedded script downloaded 1 billion times a day into the sites of 80% of the top US publishers, including The New York Times, The Wall Street Journal, ESPN, and CNN.
      </WorkItem>

      <WorkItem image="soundquake.png" title="soundQuake" href="http://soundquake.d-bow.com">
        <a href="http://grayarea.org/showcase-entry/soundquake/">Winning piece</a> from <a href="https://www.vice.com/en/article/art-hack-weekend-san-francisco-a-html5-webgl-hackathon/">Art Hack SF</a> and featured at <a href="https://www.vice.com/en/article/the-creators-project-san-francisco-2012/">the Creator's Project SF</a>. Turns data sets into meditative audio/visual experiences. [<a href="https://github.com/dbow/soundquake">source</a>]
      </WorkItem>

      <WorkItem image="kanyezone.png" title="Kanye Zone" href="http://www.kanyezone.com/">
        A <a href="http://www.reddit.com/r/Music/comments/qpwqe/dont_let_kanye_into_his_zone/">viral game</a> written up by <a href="http://www.huffingtonpost.com/2012/03/12/kanye-zone-kanye-west-jay-z_n_1339203.html">huffpo</a>, <a href="http://pitchfork.tumblr.com/post/19132634016/welcome-to-kanye-zone-the-simple-yet-effective">pitchfork</a>, <a href="https://kotaku.com/oh-god-a-kanye-west-video-game-5893111">kotaku</a>, and others.
      </WorkItem>
    </div>
  )
}
