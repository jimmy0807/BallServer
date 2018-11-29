package processor

import (
	"ball/net/socket"
)

//OnProcess 处理请求
type OnProcess func(object interface{}, client *websocket.Client)

//ProcessingChain 请求结构
type ProcessingChain struct {
	ProcessFunction OnProcess
}

//AddProcessor 添加请求
func AddProcessor(messageType int64, processFunction OnProcess) ProcessingChain {
	return ProcessingChain{
		ProcessFunction: processFunction,
	}
}
