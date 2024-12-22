



* [`vscode.l10n.t`](#vscodel10nt) - The API for translating strings in your exten
* [`@vscode/l10n`](#vscodel10n) - The library used for loading the translations 
>
> Make sure you your VS Code engine and `@types/vsc in your extension manifest is at least

> **
  "version"",
  "main": "./ % charact
```

Your `./package.nls.`:

```jsonc
{
  // That same key from the package
  "my.helloWorld.": "Hello"
}
```

Your `./package.nls.de.json`:

```jsonc
{
  // That same key from the package.json
  "my-extension.helloWorld.title": "Hallo Welt"
}
```

VS Code will automatically load the correct `package.nls.{locale}.json` (or `package.nls.json` for English) file based on the locale of the user. If no translation is available for a given key, VS Code will fall back to the English translation.

> **Note**
>
> [@vscode/l10n-dev](#vscodel10n-dev) has some tooling around these files (converting them to XLIFF files, generating Pseudo-Localization files, etc.) that you can use.

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

### Build steps

First, install all of the dependencies using `npm install`.

If you plan on working with `l10n-dev` it has one additional step. This package requires building the tree-sitter WASM files for the two grammars that we consume. To do this, you can run the following commands:

```
cd l10n-dev
npm run build-wasm
```

> **Note**
>
> On macOS or Windows, you will need to have Docker running in order to build the WASM files. The CLI runs a linux container to build the WASM files.

If you've done this correctly, you should see two `.wasm` files in the `l10n-dev` folder.

At this point you can run the build task in the repo to build in the background and run the tests with `npm test`.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
