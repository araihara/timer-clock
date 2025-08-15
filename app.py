import logging
from flask import Flask, render_template, request

# --- ロギング設定 ---
# フォーマッタの作成
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

# ファイルハンドラの設定
file_handler = logging.FileHandler('app.log')
file_handler.setFormatter(formatter)
file_handler.setLevel(logging.INFO)

# ストリームハンドラ（コンソール出力）の設定
stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)
stream_handler.setLevel(logging.INFO)

# ロガーの取得とハンドラの設定
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logger.addHandler(file_handler)
logger.addHandler(stream_handler)


# --- Flaskアプリケーション ---
app = Flask(__name__)

@app.route('/')
def index():
    """メインページを表示します。"""
    logger.info(f"Request received for main page from {request.remote_addr}")
    # index.html はまだ作成していないが、後で作成する
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
