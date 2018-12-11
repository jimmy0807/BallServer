package websocket

import (
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
	"github.com/satori/go.uuid"
)

type testMessage struct {
	client  *Client
	message []byte
}

//ClientManager 用户信息
type ClientManager struct {
	broadcast  chan testMessage
	register   chan *Client
	unregister chan *Client
	clients    map[*Client]bool
	delegate   *Delegate
}

//Client Channel
type Client struct {
	ID     string
	socket *websocket.Conn
	send   chan []byte
}

var instance *ClientManager
var once sync.Once

//Instance 获取对象
func Instance() *ClientManager {
	once.Do(func() {
		instance = &ClientManager{
			broadcast:  make(chan testMessage),
			register:   make(chan *Client),
			unregister: make(chan *Client),
			clients:    make(map[*Client]bool),
		}
	})

	return instance
}

//Start 启动
func (manager *ClientManager) Start(delegate *Delegate) {
	manager.delegate = delegate
	for {
		select {
		case conn := <-manager.register:
			manager.clients[conn] = true
			//jsonMessage, _ := json.Marshal(&Message{Content: "/A new socket has connected."})
			//manager.send(jsonMessage, conn)
			//jsonMessage, _ := json.Marshal(&Message{Content: "/A new socket has connected."})
			//manager.Send(jsonMessage, nil)
			manager.delegate.onConnected(conn)
		case conn := <-manager.unregister:
			if _, ok := manager.clients[conn]; ok {
				close(conn.send)
				delete(manager.clients, conn)
				//jsonMessage, _ := json.Marshal(&Message{Content: "/A socket has disconnected."})
				//manager.send(jsonMessage, conn)
				manager.delegate.onDisConnected(conn)
			}
		case message := <-manager.broadcast:
			manager.delegate.onMessage(message.message, message.client)
			// for conn := range manager.clients {
			// 	select {
			// 	//在某些情况下是存在不希望channel缓存满了的需求的，可以用如下方法判断
			// 	case conn.send <- message:
			// 	default:
			// 		close(conn.send)
			// 		delete(manager.clients, conn)
			// 	}
			// }
		}
	}
}

//Send 发送
func (manager *ClientManager) Send(message []byte, ignore *Client) {
	for conn := range manager.clients {
		if conn != ignore {
			conn.send <- message
		}
	}
}

//SendToOneClient 发送
func (manager *ClientManager) SendToOneClient(message []byte, client *Client) {
	client.send <- message
}

//GetAllClients 获取所有用户
func (manager *ClientManager) GetAllClients() map[*Client]bool {
	return manager.clients
}

func (c *Client) read() {
	defer func() {
		instance.unregister <- c
		c.socket.Close()
	}()

	for {
		_, message, err := c.socket.ReadMessage()
		if err != nil {
			instance.unregister <- c
			c.socket.Close()
			break
		}

		// jsonMessage, _ := json.Marshal(&Message{Sender: c.id, Content: string(message)})
		// instance.broadcast <- jsonMessage

		instance.broadcast <- testMessage{
			message: message,
			client:  c,
		}
	}
}

func (c *Client) write() {
	defer func() {
		c.socket.Close()
	}()

	for {
		select {
		case message, ok := <-c.send:
			if !ok {
				c.socket.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			c.socket.WriteMessage(websocket.TextMessage, message)
		}
	}
}

//Upgrader 转给Manager处理
func (manager *ClientManager) Upgrader(res http.ResponseWriter, req *http.Request) {
	conn, error := (&websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }}).Upgrade(res, req, nil)
	if error != nil {
		http.NotFound(res, req)
		return
	}

	u1, _ := uuid.NewV4()

	client := &Client{ID: u1.String(), socket: conn, send: make(chan []byte)}

	instance.register <- client

	go client.read()
	go client.write()
}
