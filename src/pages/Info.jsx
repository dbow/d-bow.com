import { Link } from 'react-router-dom'

export default function Info() {
  return (
    <div className="pt-6">
      <p>I'm an Oakland-based software engineer.</p>
      <p><Link to="/work">My work</Link> is a little all over the place.</p>
<p>I can be reached at <span className="italic">danny@(this website url)</span>.</p>
    </div>
  )
}
