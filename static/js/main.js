document.addEventListener("DOMContentLoaded", function () {
  var sendButton = document.getElementsByClassName("send-button")[0];
  var messageInput = document.getElementsByClassName("message-input")[0];
  var messageList = document.getElementsByClassName("message-list")[0];

  
let insertHtml = `
<!-- loading -->
<div id="loading" class="is-hide">
  <div class="cv-spinner">
    <span class="spinner"></span>
  </div>
</div>
<!-- loading -->
`;

let insertCSS = `
<style>
  #loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: 100px;
    height: 100px;
    background: rgba(0, 0, 0, 0);
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none; /* ローディング画面の上でのクリックイベントを無効化 */
  }
  
  #loading .cv-spinner {
    width: 80px;
    height: 80px;
    border: 4px #ddd solid;
    border-top: 4px #999 solid;
    border-radius: 50%;
    animation: sp-anime 0.8s infinite linear;
  }
  
  @keyframes sp-anime {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
  
  #loading.is-hide {
    display: none;
  }
</style>
`;

document.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend', insertCSS);
document.getElementsByTagName('body')[0].insertAdjacentHTML('afterbegin', insertHtml);


  sendButton.addEventListener("click", function () {
    var messageText = messageInput.value.trim();
    showLoading(); // これがぐるぐるを移す合図になる。関数は下に定義。

    if (messageText !== "") {
      var messageDiv = document.createElement("div");
      messageDiv.className = "message";

      var senderDiv = document.createElement("div");
      senderDiv.className = "sender";
      senderDiv.textContent = "User1:";

      var contentDiv = document.createElement("div");
      contentDiv.className = "content";
      contentDiv.textContent = messageText;

      messageDiv.appendChild(senderDiv);
      messageDiv.appendChild(contentDiv);
      messageList.appendChild(messageDiv);
      messageInput.value = "";
      messageList.scrollTop = messageList.scrollHeight;
    }

    fetch("/get_variable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messageText }),
    })
      .then((response) => response.json())
      .then((data) => {
        var messageDiv = document.createElement("div");
        messageDiv.className = "answer";

        var senderDiv = document.createElement("div");
        senderDiv.className = "sender";
        senderDiv.textContent = "User2:";

        var contentDiv = document.createElement("div");
        contentDiv.className = "content";
        contentDiv.textContent = data.variable;

        hideLoading(); //これがぐるぐるを隠す関数。
        
        messageDiv.appendChild(senderDiv);
        messageDiv.appendChild(contentDiv);
        messageList.appendChild(messageDiv);
        messageInput.value = "";
        messageList.scrollTop = messageList.scrollHeight;
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });
  
  //ぐるぐる出し
  function showLoading() {
    isLoadingVisible = true;
    loading.style.pointerEvents = "auto";
    loading.classList.remove('is-hide');
  }
  //ぐるぐる隠し
  function hideLoading() {
    isLoadingVisible = false;
    loading.style.pointerEvents = "none";
    loading.classList.add('is-hide');


});
