'use babel';
/* @flow */

import type {Datatip} from 'nuclide/pkg/nuclide-datatip/lib/types';
import type {GithubUser} from './types';

import {React} from 'react-for-atom';

type DatatipComponentProps = {
  user: GithubUser;
};

export function makeGithubUserDatatipComponent(user: GithubUser): ReactClass {
  return () => <GithubDatatipComponent user={user} />;
}

const GithubDatatipComponent = (props: DatatipComponentProps) => {
  const {
      login,
      id,
      avatar_url,
      gravatar_id,
      type,
      name,
      company,
      blog,
      location,
      email,
      bio,
      public_repos,
      public_gists,
      followers,
      following,
      created_at,
      updated_at,
  } = props.user;
  return (
    <div className="atom-github-user-datatip">
      <div className="atom-github-user-datatip-header">
        <div><img className="atom-github-user-datatip-avatar" src={avatar_url} /></div>
        <div className="atom-github-user-datatip-header-name">
          <div className="atom-github-user-datatip-header-fullname">{name}</div>
          <div>
            <span className="icon icon-mark-github">
              <a href={`https://github.com/${login}`} title="Open in Browser">@{login}</a>
            </span>
          </div>
        </div>
      </div>
      {location == null ? null :
        <div>
          <span className="icon icon-location">
            {location}
          </span>
        </div>
      }
      {bio == null ? null :
        <div>
          <span className="icon icon-beer">
            {bio}
          </span>
        </div>
      }
      {company == null ? null :
        <div>
          <span className="icon icon-organization">
            {company}
          </span>
        </div>
      }
      {blog == null ? null :
        <div>
          <span className="icon icon-link">
            <a href={blog}>{blog}</a>
          </span>
        </div>
      }
      <div>
        <span className="icon icon-clock">
          joined on {new Date(created_at).toDateString()}
        </span>
      </div>
      <div className="atom-github-user-datatip-metrics-section">
        <div className="atom-github-user-datatip-metrics-section-item">
          <span className="atom-github-user-datatip-metric">{followers}</span>
          <br />
          Followers
        </div>
        <div className="atom-github-user-datatip-metrics-section-item">
          <span className="atom-github-user-datatip-metric">{following}</span>
          <br />
          Following
        </div>
        <div className="atom-github-user-datatip-metrics-section-item">
          <span className="atom-github-user-datatip-metric">{public_repos}</span>
          <br />
          Repos
        </div>
        <div className="atom-github-user-datatip-metrics-section-item">
          <span className="atom-github-user-datatip-metric">{public_gists}</span>
          <br />
          Gists
        </div>
      </div>
    </div>
  );
};
