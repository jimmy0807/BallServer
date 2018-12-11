package UserAccount

import (
	"ball/net/socket"
	"sync"
)

//UserAccountMananger 用户信息管理类
type UserAccountMananger struct {
	clients map[string]*UserAccount
}

//UserAccount 用户信息
type UserAccount struct {
	Position string `json:"pos,omitempty"`
	Client   *websocket.Client
}

var instance *UserAccountMananger
var once sync.Once

//Instance 获取对象
func Instance() *UserAccountMananger {
	once.Do(func() {
		instance = &UserAccountMananger{
			clients: make(map[string]*UserAccount),
		}
	})

	return instance
}

//AddAccount 添加用户
func (manager *UserAccountMananger) AddAccount(client *websocket.Client) {
	account := UserAccount{
		Client: client,
	}

	manager.clients[client.ID] = &account
}

//RemoveAccount 添加用户
func (manager *UserAccountMananger) RemoveAccount(client *websocket.Client) {
	delete(manager.clients, client.ID)
}

//GetAllClients 获取所有用户
func (manager *UserAccountMananger) GetAllClients() map[string]*UserAccount {
	return manager.clients
}
