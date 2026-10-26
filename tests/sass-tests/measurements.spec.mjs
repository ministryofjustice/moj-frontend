import path from 'path'
import { pathToFileURL } from 'url'

import { compileString } from 'sass-embedded'

function compile(source) {
  return compileString(source, {
    loadPaths: ['node_modules'],
    url: pathToFileURL(
      path.join(process.cwd(), 'tests/sass-tests/fixture.scss')
    ),
    quietDeps: true
  }).css
}

describe('MOJ measurement settings', () => {
  test('defaults to GOV.UK measurement values', () => {
    const css = compile(`
      @use "../../src/moj/all" as moj;
      @use "govuk-frontend/dist/govuk/base" as govuk;

      .result {
        --govuk-page-width: #{govuk.$govuk-page-width};
        --moj-page-width: #{moj.$moj-page-width};
        --govuk-gutter: #{govuk.$govuk-gutter};
        --moj-gutter: #{moj.$moj-gutter};
      }
    `)

    expect(css).toContain('--govuk-page-width: 960px')
    expect(css).toContain('--moj-page-width: 960px')
    expect(css).toContain('--govuk-gutter: 30px')
    expect(css).toContain('--moj-gutter: 30px')
  })

  test.each(['use', 'forward'])(
    'inherits GOV.UK configuration applied with @%s',
    (rule) => {
      const css = compile(`
        @${rule} "govuk-frontend/dist/govuk" with (
          $govuk-page-width: 1100px,
          $govuk-gutter: 40px
        );

        @use "../../src/moj/all" as moj;

        .result {
          --moj-page-width: #{moj.$moj-page-width};
          --moj-gutter: #{moj.$moj-gutter};
        }
      `)

      expect(css).toContain('--moj-page-width: 1100px')
      expect(css).toContain('--moj-gutter: 40px')
    }
  )

  test.each(['use', 'forward'])(
    'allows MOJ values to override inherited GOV.UK values with @%s',
    (rule) => {
      const css = compile(`
      @${rule} "govuk-frontend/dist/govuk" with (
        $govuk-page-width: 1100px,
        $govuk-gutter: 40px
      );

      @use "../../src/moj/all" as moj with (
        $moj-page-width: 1200px,
        $moj-gutter: 50px
      );

      .result {
        --moj-page-width: #{moj.$moj-page-width};
        --moj-gutter: #{moj.$moj-gutter};
      }
    `)

      expect(css).toContain('--moj-page-width: 1200px')
      expect(css).toContain('--moj-gutter: 50px')
    }
  )
})
