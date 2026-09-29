import { compileString } from 'sass-embedded'

function compile(source) {
  return compileString(source, {
    loadPaths: [process.cwd()],
    quietDeps: true
  }).css
}

describe('MOJ asset settings', () => {
  test('defaults to the GOV.UK assets path', () => {
    const css = compile(`
      @use "src/moj/all" as moj;
      @use "node_modules/govuk-frontend/dist/govuk/base" as govuk;

      .result {
        --govuk-assets-path: #{govuk.$govuk-assets-path};
        --moj-assets-path: #{moj.$moj-assets-path};
      }
    `)

    expect(css).toContain('--govuk-assets-path: /assets/')
    expect(css).toContain('--moj-assets-path: /assets/')
  })

  test.each(['use', 'forward'])(
    'inherits GOV.UK assets configuration applied with @%s',
    (rule) => {
      const css = compile(`
        @${rule} "node_modules/govuk-frontend/dist/govuk" with (
          $govuk-assets-path: "/application-assets/"
        );

        @use "src/moj/all" as moj;

        .result {
          --moj-assets-path: #{moj.$moj-assets-path};
        }
      `)

      expect(css).toContain('--moj-assets-path: /application-assets/')
    }
  )

  test.each(['use', 'forward'])(
    'allows the MOJ assets path to override the GOV.UK value with @%s',
    (rule) => {
      const css = compile(`
      @${rule} "node_modules/govuk-frontend/dist/govuk" with (
        $govuk-assets-path: "/application-assets/"
      );

      @use "src/moj/all" as moj with (
        $moj-assets-path: "/moj-assets/"
      );

      .result {
        --moj-assets-path: #{moj.$moj-assets-path};
      }
    `)

      expect(css).toContain('--moj-assets-path: /moj-assets/')
    }
  )
})
