# Input Elements

The input elements come in many shapes, but the component library so
far only works with text fields and buttons.

The input component can be used by appending the `awi-input` class
onto an input element.

## Text Inputs

The text inputs are stetched over the whole width of the form.

### Labels

Labels, if used with the `awi-input` class, connects to a text
input.

### Usage
```html
<label class="awi-input"></label><input type="text" class="awi-input"/>
<label class="awi-input"></label><input type="password" class="awi-input"/>
<label class="awi-input"></label><input type="email" class="awi-input"/>
```

## Buttons

Buttons have styles applied, too.
They have rounded edges, etc. to make them consistent with the other
input elements.

### Usage
```html
<input type="submit" class="awi-input" value="input"></button>
<button class="awi-input">Button</button>
```