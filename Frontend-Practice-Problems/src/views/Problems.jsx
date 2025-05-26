import { Link } from 'react-router-dom';
import { problems } from '../constants';

export default function Problems() {
  return (
    <div>
      <h1>List of Problems</h1>
      <ul>
        {problems.map((problem) => (
          <li key={problem.id}>
            <Link to={`/problems/${problem.link}`}>{problem.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}