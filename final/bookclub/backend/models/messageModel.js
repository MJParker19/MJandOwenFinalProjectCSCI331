let messages = [];

function displayMessages() {
  const messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML = ""; // Clear previous messages

  messages.forEach(message => {
    const messageElement = document.createElement("div");
    messageElement.textContent = `${message.username}: ${message.content}`;
    messagesContainer.appendChild(messageElement);
  });
}

function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const content = messageInput.value.trim();
  
  if (content === "") {
    alert("Please enter a message.");
    return;
  }
  
  // Add the message to the array (could be replaced by real-time API)
  messages.push({ username: "User", content });

  // Clear the input and refresh the messages
  messageInput.value = "";
  displayMessages();
}

// Call the function to show messages when the page loads
document.addEventListener('DOMContentLoaded', displayMessages);
