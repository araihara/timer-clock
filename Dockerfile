# Python 3.9 の軽量版をベースイメージとして使用
FROM python:3.9-slim

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係ファイルをコンテナにコピー
COPY requirements.txt .

# 依存関係をインストール
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションコードをコンテナにコピー
COPY . .

# アプリケーションがリッスンするポートを指定
EXPOSE 5000

# アプリケーションを起動するコマンド
CMD ["flask", "run", "--host=0.0.0.0"]
