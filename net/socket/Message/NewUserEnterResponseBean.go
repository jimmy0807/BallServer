package message

//NewUserEnterResponseBean 给刚登录的人 所有在线玩家的信息
type NewUserEnterResponseBean struct {
	Users []NewUserEnterResponseOnePlayerBean `json:"users"`
}

//NewUserEnterResponseOnePlayerBean 给刚登录的人 所有在线玩家的信息
type NewUserEnterResponseOnePlayerBean struct {
	Position string `json:"pos"`
	UserID   string `json:"userID"`
}
