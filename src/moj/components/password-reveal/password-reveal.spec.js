require('../../vendor/jquery');
globalThis.MOJFrontend = {};

require('./password-reveal');

describe('Password reveal', () => {
  let input

  beforeEach(() => {
    input = document.createElement('input');
    input.type = 'password';

    new MOJFrontend.PasswordReveal(input);
  })

  test('initialises container', () => {
    expect($(input).data('moj-password-reveal-initialised')).toBe(true);

    expect(input.parentNode.tagName).toBe('DIV');
    expect(input.parentNode.classList).toContain('moj-password-reveal');

    expect(input.nextSibling.tagName).toBe('BUTTON');
    expect(input.nextSibling.innerHTML).toBe('Show');
  });

  test('toggle reveal', () => {
    const button = input.nextSibling;

    button.click();

    expect(input.type).toBe('text');
    expect(button.innerHTML).toBe('Hide');

    button.click();

    expect(input.type).toBe('password');
    expect(button.innerHTML).toBe('Show');
  })
});
