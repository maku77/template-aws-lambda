# template-aws-lambda

AWS Lambda を使ったプロジェクトのテンプレートです。
下記のような構成のプロジェクトを想定しています。

- AWS Lambda 関数は TypeScript で実装する
- CloudFormation (SAM) でデプロイする


S3 バケットの用意
----

Lambda 関数のデプロイには、ZIP ファイルを一時的にアップロードする S3 バケットが必要になるので、まずは S3 バケットを用意しておきます。

{{< code >}}
$ aws s3 mb s3://bucket-123456789012-functions
{{< /code >}}


Lambda 関数のビルド
----

Lambda 関数のコードは、`src` ディレクトリ内に格納されています。
次のようにビルドすると、デプロイ用の `myapp.zip` ファイルが生成されます。

{{< code >}}
$ npm install  # 外部ライブラリのインストール
$ npm build    # src ディレクトリの TypeScript がビルドされます
$ npm zip      # build ディレクトリのファイルがデプロイ用に ZIP 化されます
{{< /code >}}


CloudFormation によるデプロイ
----

トップディレクトリで次のように実行し、デプロイ用パッケージ `function.zip` を S3 バケットにアップロードします。
成功すると、デプロイ用の CloudFormation テンプレート `template.packaged.yml` が生成されます。

{{< code >}}
$ aws cloudformation package \
    --template-file template.yml \
    --output-template-file template.packaged.yml \
    --s3-bucket bucket-123456789012-functions
{{< /code >}}

生成されたテンプレートを使って、CloudFormation のスタックを生成します。

{{< code >}}
$ aws cloudformation deploy \
    --stack-name mystack \
    --template-file template.packaged.yml \
    --capabilities CAPABILITY_IAM
{{< /code >}}

