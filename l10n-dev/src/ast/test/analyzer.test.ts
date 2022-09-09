import * as assert from 'assert';
import * as crypto from 'crypto';
import { l10nJsonMessageFormat } from '../../common';
import { JavaScriptAnalyzer } from '../analyzer';

describe('JavaScriptAnalyzer', () => {
    const basecaseText = 'Hello World';

    it('require basecase', () => {
        const analyzer = new JavaScriptAnalyzer();
        const result = analyzer.analyze(`
            const vscode = require('vscode');
            vscode.l10n.t('${basecaseText}');
        `);
        assert.strictEqual(Object.keys(result.bundle).length, 1);
        assert.strictEqual(result.bundle[basecaseText], basecaseText);
    });

    it('require basecase object binding', () => {
        const analyzer = new JavaScriptAnalyzer();
        const result = analyzer.analyze(`
            const { l10n } = require('vscode');
            l10n.t('${basecaseText}');
        `);
        assert.strictEqual(Object.keys(result.bundle).length, 1);
        assert.strictEqual(result.bundle[basecaseText], basecaseText);
    });

    it('import basecase', () => {
        const analyzer = new JavaScriptAnalyzer();
        const result = analyzer.analyze(`
            import * as vscode from 'vscode';
            vscode.l10n.t('${basecaseText}');
        `);
        assert.strictEqual(Object.keys(result.bundle).length, 1);
        assert.strictEqual(result.bundle[basecaseText], basecaseText);
    });

    it('import basecase named imports', () => {
        const analyzer = new JavaScriptAnalyzer();
        const result = analyzer.analyze(`
            import { l10n } from 'vscode';
            l10n.t('${basecaseText}');
        `);
        assert.strictEqual(Object.keys(result.bundle).length, 1);
        assert.strictEqual(result.bundle[basecaseText], basecaseText);
    });

    it('import newlines named imports', () => {
        const analyzer = new JavaScriptAnalyzer();
        const result = analyzer.analyze(`
            import {
                Command,
                Disposable,
                l10n,
                Event,
                EventEmitter,
                FilePermission,
                FileStat,
                FileSystemError,
                FileType,
                Range,
                TextDocumentShowOptions,
                Uri,
                window,
                workspace,
                WorkspaceEdit,
            } from 'vscode';
            l10n.t('${basecaseText}');
        `);
        assert.strictEqual(Object.keys(result.bundle).length, 1);
        assert.strictEqual(result.bundle[basecaseText], basecaseText);
    });

    it('with comments', () => {
        const analyzer = new JavaScriptAnalyzer();
        const comment = 'This is a comment';
        const combineComments = crypto.createHash('sha256');
        combineComments.update(comment);
        const key = `${basecaseText}/${combineComments.digest('hex')}`;
        const result = analyzer.analyze(`
            import { l10n } from 'vscode';
            l10n.t({
                message: '${basecaseText}',
                comment: ['${comment}'],
                args: ['this is an arg']
            });
        `);
        assert.strictEqual(Object.keys(result.bundle).length, 1);
        assert.strictEqual((result.bundle[key]! as l10nJsonMessageFormat).message, basecaseText);
        assert.strictEqual((result.bundle[key]! as l10nJsonMessageFormat).comment.length, 1);
        assert.strictEqual((result.bundle[key]! as l10nJsonMessageFormat).comment[0], comment);
    });

    it('vscode-l10n basecase', () => {
        const analyzer = new JavaScriptAnalyzer();
        const result = analyzer.analyze(`
            import * as l10n from 'vscode-l10n';
            l10n.t('${basecaseText}');
        `);
        assert.strictEqual(Object.keys(result.bundle).length, 1);
        assert.strictEqual(result.bundle[basecaseText], basecaseText);
    });

    it('vscode-l10n does not pickup config calls', () => {
        const analyzer = new JavaScriptAnalyzer();
        const result = analyzer.analyze(`
            import * as l10n from 'vscode-l10n';
            l10n.config({});
        `);
        assert.strictEqual(Object.keys(result.bundle).length, 0);
    });

    it('does not count other t functions', () => {
        const analyzer = new JavaScriptAnalyzer();
        const result = analyzer.analyze(`
            import * as i18next from 'i18next';
            i18next.t('${basecaseText}');
        `);
        assert.strictEqual(Object.keys(result.bundle).length, 0);
    });
});