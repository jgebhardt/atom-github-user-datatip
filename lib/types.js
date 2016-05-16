'use babel';
/* @flow */

type Uri = string;

/* Based on a VERY cursory glance at some random response */
export type GithubUser = {
  login: string;
  id: number;
  avatar_url: Uri;
  gravatar_id: string;
  url: Uri;
  html_url: Uri;
  followers_url: Uri;
  following_url: Uri;
  gists_url: Uri;
  starred_url: Uri;
  subscriptions_url: Uri;
  organizations_url: Uri;
  repos_url: Uri;
  events_url: Uri;
  received_events_url: Uri;
  type: string;
  site_admin: boolean;
  name: ?string;
  company: ?string;
  blog: ?string;
  location: ?string;
  email: null;
  hireable: boolean;
  bio: ?string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: ?string;
}
