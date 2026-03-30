function MusicItem({ image, title, href, children }) {
  return (
    <div className="relative my-[70px] min-h-[300px] first:mt-[30px]">
      <div className="relative">
        <img src={`/images/${image}`} alt={title} className="w-full" loading="lazy" />
        <div className="absolute top-0 left-0 p-[50px] z-[2] max-[615px]:p-[30px]">
          <h4 className="inline m-0 text-[40px] max-[615px]:text-[30px] text-white bg-[rgba(49,66,60,0.85)] leading-[1em] relative">
            <a href={href} className="text-white font-normal p-[10px] tracking-[-0.01em] hover:text-white">
              {title}
            </a>
          </h4>
        </div>
      </div>
      {children}
    </div>
  )
}

function Section({ children }) {
  return <div className="my-[1em]">{children}</div>
}

function Quote({ children }) {
  return <div className="ml-[1em] mt-[0.5em]">{children}</div>
}

export default function Music() {
  return (
    <div>
      <MusicItem image="utmost.jpeg" title="The Utmost Something - Growing Up EP (2025)" href="https://distrokid.com/hyperfollow/theutmostsomething/growing-up">
        <Section>
          <iframe style={{ borderRadius: '12px', border: 0, width: '100%', height: '352px' }} src="https://open.spotify.com/embed/album/6MkNMMoQhTBCQCHZGKMk6E?utm_source=generator" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Growing Up EP by The Utmost Something" />
        </Section>
        <Section>
          Recorded & mixed by Robert Kirby.<br />
          Mastered by Amar Lal at Macro Sound.<br />
          Recorded at Sharkbite Studios in Oakland, CA.
        </Section>
      </MusicItem>

      <MusicItem image="creeps.jpg" title="Car Creeps - S/T (2013)" href="https://carcreeps.bandcamp.com/">
        <Section>
          Car Creeps was born in the spring of 2010 and died shortly thereafter. They almost played a show once, but the venue shut down before the show could happen.
        </Section>
        <Section>
          <iframe style={{ border: 0, width: '100%', height: '241px' }} src="https://bandcamp.com/EmbeddedPlayer/album=757783275/size=large/bgcol=ffffff/linkcol=ff0074/artwork=none/transparent=true/" seamless title="Car Creeps by Car Creeps">
            <a href="http://carcreeps.bandcamp.com/album/car-creeps">Car Creeps by Car Creeps</a>
          </iframe>
        </Section>
      </MusicItem>

      <MusicItem image="majic.jpg" title="The Majic Eyes - S/T (2009)" href="http://lcmrrecords.com/themagiceyes.html">
        <Section>
          <audio controls preload="metadata" aria-label="The Majic Eyes - It's Time to Go">
            <source src="/audio/themagiceyes_-_07_-_its_time_to_go.mp3" type="audio/mp3" />
          </audio>
        </Section>
        <Section>
          <a href="http://eggyrecords.blogspot.nl/2009/09/these-are-three-latest-releases-from.html">Released by Eggy Records</a>
          <Quote>"...This tape is the debut of his bedroom psych-pop project Majic Eyes. The territory here is the hazy pop of prime Elephant 6 -- weird, blown out sounds, solid pop songs, strange, sometimes disturbing, lyrics. What really stands out is the simplicity of these songs, and the stripped-down arrangements make the sturdiness of the song-writing apparent. Adorned with restraint, the simple, home-made percussion, odd synthesizer noise and doubled-up vocals buttress the songs in the right places without weighing them down. Eggy Records is very proud to be introducing this music to a larger audience."</Quote>
        </Section>
        <Section>
          <a href="http://cassettegods.blogspot.nl/2009/12/majic-eyes-st-c20-eggy-records.html">Reviewed by Cassette Gods</a>
          <Quote>"That's definitely the quickest identifier of this music, simple chord progressions, ultra bright bass sounds, sometimes blown-out yet subtle recording, it's like he heard the Neutral Milk Hotel records and said, 'well, I don't have a whole bunch of people who know how to play exotic horns or anything that can help me out with this, so I guess I'll just do it myself'. And that he did, a really impressive and vivid album was made in this guy's bedroom, for the first seven tracks, that is. The last is an extra long rambler outdoors (aptly titled 'a midafternoon walk on prince to broadway in summer'), a real pleasant way to close this short introduction to something you can probably expect to hear a lot more about in the future. If this is your bag, definitely climb in."</Quote>
        </Section>
      </MusicItem>

      <MusicItem image="ohiotapes.jpg" title="Yar - The Ohio Tapes (2013)" href="https://soundcloud.com/dbow1234/sets/yar-ohio-tapes">
        <Section>
          <iframe width="100%" height="166" scrolling="no" frameBorder="no" title="Yar - The Ohio Tapes" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/79998233&amp;color=ff0074&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
        </Section>
        <Section>
          Three songs by three people, recorded in Grafton, Ohio on a TASCAM Portastudio 424 MKII
        </Section>
      </MusicItem>
    </div>
  )
}
