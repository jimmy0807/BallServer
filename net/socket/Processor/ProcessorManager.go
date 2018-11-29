package processor

//OnProcess 处理请求
type OnProcess func(object interface{})

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
