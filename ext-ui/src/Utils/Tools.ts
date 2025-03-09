const vscode = window.acquireVsCodeApi
  ? window.acquireVsCodeApi()
  : window.parent;

// @ts-ignore
const isDev = window.acquireVsCodeApi ? false : true;
console.log("isDev ", isDev);

const globalListener = {} as any;

window.addEventListener("message", (event) => {
  const { command, data }: { command: string; data: any } = event.data;
  const callback = globalListener[command];
  console.log("收到消息:", command, data);
  if (typeof data == "string") {
    if (data.length <= 100) console.log("收到消息:", command, data);
  } else console.log("收到消息:", command, data);

  if (callback != null) {
    callback(data instanceof Object ? data : data);
  }
});

export const Api = {
  postMsg: (command: string, data?: any) => {
    if (isDev) {
      return vscode.postMessage(
        {
          forward: true,
          command,
          data,
        },
        "*"
      );
    }
    vscode.postMessage({
      command,
      data,
    });
  },
  listenMsg: <T>(command: string, callback: (data?: T) => void) => {
    globalListener[command] = callback;
  },
};
