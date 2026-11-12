---
name: jsf-page-review
description: Reviews JSF / PrimeFaces .xhtml pages and their backing beans for broken EL references, missing message-bundle keys, wrong bean scopes, AJAX update targets, validation and accessibility. Use after creating or changing .xhtml pages or JSF beans, or when a JSF page throws PropertyNotFoundException / Target Unreachable / shows ???key???.
---

# JSF page review

## 1. Collect
- The changed `.xhtml` files (`git diff --name-only <base>...HEAD -- '*.xhtml'`) and the beans they reference.
- `faces-config.xml` (resource-bundle `var` names, navigation rules) and the bundle files (`*.properties`, one per language).

## 2. Checks

### EL references
For each `#{name.property}` / `#{name.method(...)}`:
- A bean named `name` exists: `@Named("name")`, `@ManagedBean(name=)`, or Spring `@Component("name")`. Default names are the class name with a lowercase first letter.
- `property` has a getter (and a setter if used in an input); `isX()` for booleans.
- Action methods exist with a compatible signature.

### Message bundles
For each `#{msg['key']}` / `#{msg.key}`: the key exists in **every** language file. Unused new keys are fine; missing ones show `???key???`.

### Scope
- Page state with AJAX → `@ViewScoped`. `@RequestScoped` loses values between AJAX calls.
- `@SessionScoped` only for true user-session data; it must be `Serializable`.
- Never inject a narrower scope into a wider one without a proxy.

### AJAX / PrimeFaces
- `update=`/`render=` ids exist and are resolvable (`@form`, `:formId:tableId`); `process=` includes the inputs you need.
- Forms aren't nested. Buttons that submit are inside an `h:form`.
- `p:dataTable` with lazy loading implements `count` and `load` correctly; `rowKey` set when selection is used.

### Validation & conversion
- Required inputs have `required="true"` + `requiredMessage`; converters for dates (`f:convertDateTime` with pattern **and** time zone) and numbers.
- Each input shows its messages (`h:message`/`p:message for=`).

### Security & accessibility
- No `escape="false"` on user data. Actions check permissions server-side, not just `rendered=`.
- `h:outputLabel for=` on every input; meaningful button text; images have `alt`.

## 3. Output
`file.xhtml:line · problem · fix`, grouped: Broken (will fail at runtime) / Wrong behaviour / Quality.
