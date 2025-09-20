import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../../category.entity";

describe("Category Unit Tests", () => {
  let validateSpy: any;
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate");
  });

  describe("Constructor", () => {
    describe("without optional fields", () => {
      test("should create a Category with default values", () => {
        const category = new Category({ name: "Movie" });

        expect(category.category_id).toBeInstanceOf(Uuid);
        expect(category.name).toBe("Movie");
        expect(category.description).toBeNull();
        expect(category.is_active).toBeTruthy();
        expect(category.created_at).toBeInstanceOf(Date);
      });
    });

    describe("with all fields", () => {
      test("should create a Category with given values", () => {
        const created_at = new Date();
        const category = new Category({
          name: "Movie",
          description: "Movie description",
          is_active: false,
          created_at,
        });

        expect(category.category_id).toBeInstanceOf(Uuid);
        expect(category.name).toBe("Movie");
        expect(category.description).toBe("Movie description");
        expect(category.is_active).toBeFalsy();
        expect(category.created_at).toBe(created_at);
      });
    });
  });

  describe("Create Command", () => {
    test("should create a category with default values", () => {
      const category = Category.create({ name: "Movie" });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test("should create a category with description", () => {
      const category = Category.create({
        name: "Movie",
        description: "Some description",
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Some description");
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test("should create a category with is_active = false", () => {
      const category = Category.create({
        name: "Movie",
        description: "Some description",
        is_active: false,
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Some description");
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe("category_id field", () => {
    const arrange = [
      { category_id: null },
      { category_id: undefined },
      { category_id: new Uuid() },
    ];
    test.each(arrange)("id = %j", ({ category_id }) => {
      const category = new Category({
        name: "Movie",
        category_id: category_id as any,
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      if (category_id instanceof Uuid) {
        expect(category.category_id).toBe(category_id);
      }
    });
  });

  describe("Methods", () => {
    describe("changeName", () => {
      test("should change name", () => {
        const category = Category.create({ name: "Movie" });
        category.changeName("other name");
        expect(category.name).toBe("other name");
      });
    });

    describe("changeDescription", () => {
      test("should change description", () => {
        const category = Category.create({
          name: "Movie",
          description: "Some description",
        });
        category.changeDescription("other description");
        expect(category.description).toBe("other description");
      });
    });

    describe("activate", () => {
      test("should activate a category", () => {
        const category = Category.create({
          name: "Movie",
          is_active: false,
        });
        category.activate();
        expect(category.is_active).toBeTruthy();
      });
    });

    describe("deactivate", () => {
      test("should deactivate a category", () => {
        const category = Category.create({
          name: "Movie",
          is_active: true,
        });
        category.deactivate();
        expect(category.is_active).toBeFalsy();
      });
    });
  });
});