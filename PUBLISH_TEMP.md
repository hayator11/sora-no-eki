# 仮公開メモ

このフォルダは静的サイトとして、そのまま仮公開できます。

## Netlifyで仮公開する場合

1. Netlifyの「Add new site」から、このフォルダをアップロードまたはGit連携します。
2. Publish directoryは `.` のままで公開します。
3. `netlify.toml` と `_headers` により、仮公開中は `noindex, nofollow` が付きます。

## Vercelで仮公開する場合

1. GitHubで新規リポジトリを作成します。
2. このフォルダの中身をGitHubリポジトリへアップロードします。
3. Vercelで `Add New... > Project` を開き、作成したGitHubリポジトリをImportします。
4. Framework Presetは `Other` を選びます。
5. Build Commandは空、Output Directoryは `.` にします。
6. `vercel.json` により、仮公開中は `noindex, nofollow` が付きます。

## GitHubにアップロードするファイル

このフォルダ直下のファイルとディレクトリを、リポジトリ直下に置きます。

ZIPを使う場合は、`sora-no-eki-temp-publish.zip` を展開して中身をGitHubへアップロードします。

GitHubへ入れないもの:

* `sora-no-eki-temp-publish.zip`
* `.DS_Store`
* `.vercel/`
* `.netlify/`

## GitHub Pagesで仮公開する場合

1. リポジトリのルートにこのファイル群を置きます。
2. Settings > Pages で branch と root を選択します。
3. `.nojekyll` により、静的ファイルをそのまま配信できます。

## 正式公開前に外すもの

正式公開時は、以下の `noindex` 設定を外してください。

* `_headers` の `X-Robots-Tag: noindex, nofollow`
* `netlify.toml` の `X-Robots-Tag`
* `vercel.json` の `X-Robots-Tag`

正式ドメインが決まったら、以下も差し替えます。

* `site.config.js` の `siteUrl`
* 各HTMLの `canonical`
* `robots.txt` の `Sitemap`
* `sitemap.xml` と関連サイトマップ内のURL
