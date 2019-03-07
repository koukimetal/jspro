jspro

I love typescript, webpack and procon.

I like atcoder.

`yarn watch` or `npm run watch` to watch.

`yarn build` or `npm run watch` to build.

`node dist/<relative path to the file from back/contests >.js` 

`Ctrl + D` would work as EOF

`watch` uses development build which enables you to debug. On vscode, you should be able to debug easily.

https://code.visualstudio.com/docs/getstarted/settings
https://code.visualstudio.com/docs/getstarted/settings
Adding following to setting would help you to debug
```
    "launch": {
        "configurations": [{
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "console": "integratedTerminal",
            "program": "${file}",
            "outFiles": [
                "${workspaceFolder}/**/*.js"
            ]
        }],
    },
```

`build` uses production build. It helps you submit short code.