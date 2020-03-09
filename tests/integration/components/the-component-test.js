import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { set } from "@ember/object";

module("Integration | Component | the-component", function(hooks) {
  setupRenderingTest(hooks);

  test("it updates properties with this.set", async function(assert) {
    this.content = "Some content";

    await render(hbs`<TheComponent @content={{this.content}} />`);

    assert.dom(`[some-content]`).hasText("Some content");

    this.set("content", "Updated content");

    assert.dom(`[some-content]`).hasText("Updated content");
  });

  test("it doesn't update properties with set imported from '@ember/object'", async function(assert) {
    this.content = "Some content";

    await render(hbs`<TheComponent @content={{this.content}} />`);

    assert.dom(`[some-content]`).hasText("Some content");

    set(this, "content", "Updated content");

    assert
      .dom(`[some-content]`)
      .doesNotContainText("Updated content", "'content' value is not set");

    assert
      .dom(`[some-content]`)
      .hasText("Some content", "'content' still has the old value");

    setTimeout(() => {
      assert
        .dom(`[some-content]`)
        .hasText(
          "Updated content",
          "'content' prop gets updated only in the next tick"
        );
    });
  });
});
