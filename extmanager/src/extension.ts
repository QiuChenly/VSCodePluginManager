import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { Uri } from "vscode";

class ExtProvider implements vscode.WebviewViewProvider {
  myContext: vscode.ExtensionContext;
  constructor(context: vscode.ExtensionContext) {
    this.myContext = context;
  }

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    token: vscode.CancellationToken
  ): Thenable<void> | void {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.myContext.extensionUri],
    } as vscode.WebviewOptions;
    const dev = false;
    if (dev) {
      const file = path.join(
        this.myContext.extensionPath,
        "devSrc",
        "dev.html"
      );
      webviewView.webview.html = webviewView.webview.html = fs.readFileSync(
        file,
        "utf-8"
      );
      //   webviewView.webview.html = fs
      //     .readFileSync(file, "utf-8")
      //     .toString()
      //     .replace(
      //       /<base href="[^"]*">/,
      //       `<base href="${webviewView.webview!.asWebviewUri(
      //         vscode.Uri.file(file)
      //       )}">`
      //     )
      //     .replace(/<(script|link) /g, '<$1 nonce="vuescript" ')
      //     .replace(
      //       /<head>/,
      //       `<head>
      // <meta http-equiv="Content-Security-Policy" content="default-src 'none';
      // img-src *; font-src http://* https://*; style-src http://* https://* 'unsafe-inline'; frame-src *;script-src 'nonce-vuescript';">
      // `
      //     );
    } else {
      webviewView.webview.html = fs.readFileSync(
        path.join(this.myContext.extensionPath, "media", "index.html"),
        "utf-8"
      );
    }

    // 监听来自 Webview 的消息
    webviewView.webview.onDidReceiveMessage((message) => {
      switch (message.command) {
        case "getAllExtList": {
          const lst = getInstalledExtensions(webviewView);
          console.log("获取到插件", lst);

          // 将数据发送回 UI
          webviewView.webview.postMessage({
            command: "updateExtList",
            data: lst,
          });
          return;
        }

        case "getImage": {
          const dt = message;
          const img = fs.readFileSync(dt.data["src"]).toString("base64");
          webviewView.webview.postMessage({
            command: dt.data["src"],
            data: "data:image/png;base64," + img,
          });
          return;
        }
        case "uninstall": {
          const dt = message;
          const id = dt.data["id"];
          uninstallExtension(id, () => {
            // 将数据发送回 UI
            webviewView.webview.postMessage({
              command: "needUpdate",
            });
          });
          return;
        }
      }
    });
  }
}

// 获取已安装的扩展
function getInstalledExtensions(view: vscode.WebviewView) {
  const extensions = vscode.extensions.all;
  const userExtensions = extensions.filter((extension) => {
    const packageJSON = extension.packageJSON as any;
    const ext = vscode.extensions.getExtension(
      packageJSON.identifier["_lower"]
    );
    const isBuiltin = packageJSON["isBuiltin"];
    // 判断扩展是否为用户安装的扩展，通常用户安装的扩展路径不包含系统目录
    return !isBuiltin;
  });

  return userExtensions.map((ext) => {
    if (ext === undefined) {
      vscode.window.showErrorMessage("读取出现错误");
      return null;
    }
    const extInfo = ext.packageJSON;

    extInfo.logoUri =
      extInfo["extensionLocation"]["fsPath"] + "/" + extInfo["icon"];
    //console.log(JSON.stringify(extInfo));
    return extInfo;
  });
}

// 卸载扩展
function uninstallExtension(extensionId: string, final: () => void) {
  vscode.commands
    .executeCommand("workbench.extensions.uninstallExtension", extensionId)
    .then(
      () => {
        vscode.window.showInformationMessage(`成功卸载插件: ${extensionId}`);
        final();
      },
      (err) => {
        final();
        vscode.window.showErrorMessage(
          `卸载插件失败: ${extensionId}, 错误信息: ${err}`
        );
      }
    );
}

export function activate(context: vscode.ExtensionContext) {
  console.log("哇！开始激活了！");

  vscode.window.registerWebviewViewProvider(
    "ext-manager-super",
    new ExtProvider(context)
  );
}
