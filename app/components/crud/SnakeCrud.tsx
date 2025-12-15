"use client";

import { useState } from "react";

type SnakeCategory = "venomous" | "non-venomous";

type Snake = {
  id: number;
  name: string;
  scientificName: string;
  category: SnakeCategory;
};

type FilterCategory = "all" | SnakeCategory;

export default function SnakeCrud() {
  const [snakes, setSnakes] = useState<Snake[]>([]);

  // form state
  const [name, setName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [category, setCategory] = useState<SnakeCategory>("venomous");
  const [error, setError] = useState("");

  // edit / delete state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // modal visibility
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // filters
  const [filterCategory, setFilterCategory] = useState<FilterCategory>("all");
  const [searchText, setSearchText] = useState("");

  const resetForm = () => {
    setName("");
    setScientificName("");
    setCategory("venomous");
    setEditingId(null);
    setError("");
  };

  const openAddModal = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const openEditModal = (snake: Snake) => {
    setEditingId(snake.id);
    setName(snake.name);
    setScientificName(snake.scientificName);
    setCategory(snake.category);
    setError("");
    setIsFormOpen(true);
  };

  const closeFormModal = () => {
    setIsFormOpen(false);
    resetForm();
  };

  const openDeleteModal = (id: number) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setIsDeleteOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!scientificName.trim()) {
      setError("Scientific name is required");
      return;
    }

    const data: Omit<Snake, "id"> = {
      name: name.trim(),
      scientificName: scientificName.trim(),
      category,
    };

    if (editingId === null) {
      const newSnake: Snake = { id: Date.now(), ...data };
      setSnakes((prev) => [...prev, newSnake]);
    } else {
      setSnakes((prev) =>
        prev.map((snake) =>
          snake.id === editingId ? { ...snake, ...data } : snake
        )
      );
    }

    closeFormModal();
  };

  const handleDelete = () => {
    if (deleteId === null) return;
    setSnakes((prev) => prev.filter((snake) => snake.id !== deleteId));
    closeDeleteModal();
  };

  const filteredSnakes = snakes.filter((snake) => {
    const matchCategory =
      filterCategory === "all" ? true : snake.category === filterCategory;
    const matchSearch = snake.name
      .toLowerCase()
      .includes(searchText.toLowerCase().trim());
    return matchCategory && matchSearch;
  });

  return (
    <section className="w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-lg">
      {/* Hero header */}
      <div className="bg-gradient-to-r from-[#303030] to-[#494949] px-6 py-6 text-white sm:px-8 sm:py-8">
        <p className="text-xs uppercase tracking-wide text-gray-300">
          Snake categories
        </p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          Manage your snake list
        </h1>
        <p className="mt-2 text-sm text-gray-300 sm:text-base">
          Use the button below to add snakes, then edit or delete them from the
          list.
        </p>
      </div>

      {/* Main content */}
      <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
        {/* Top row: filters + add button */}
        <div className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
            <button
              type="button"
              onClick={() => setFilterCategory("all")}
              className={`rounded-full border px-3 py-1 ${
                filterCategory === "all"
                  ? "border-[#352624] bg-[#352624]/10 text-[#352624]"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory("venomous")}
              className={`rounded-full border px-3 py-1 ${
                filterCategory === "venomous"
                  ? "border-[#352624] bg-[#352624]/10 text-[#352624]"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Venomous
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory("non-venomous")}
              className={`rounded-full border px-3 py-1 ${
                filterCategory === "non-venomous"
                  ? "border-[#352624] bg-[#352624]/10 text-[#352624]"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Non‑venomous
            </button>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#503936] focus:ring-2 focus:ring-[#503936] sm:w-56"
            />
            <button
              type="button"
              onClick={openAddModal}
              className="rounded bg-[#352624] px-4 py-2 text-sm font-semibold text-white hover:bg-[#503936]"
            >
              + Add snake
            </button>
          </div>
        </div>

        {/* List */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-800">
            Snakes list ({filteredSnakes.length})
          </h2>

          {filteredSnakes.length === 0 ? (
            <p className="text-sm text-gray-500">
              No snakes found. Click “Add snake” to create the first one.
            </p>
          ) : (
            <ul className="space-y-2">
              {filteredSnakes.map((snake) => (
                <li
                  key={snake.id}
                  className="flex items-center justify-between rounded border border-gray-200 px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {snake.name}
                    </p>
                    <p className="text-xs italic text-gray-500">
                      {snake.scientificName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        snake.category === "venomous"
                          ? "bg-[#352624]/10 text-[#352624]"
                          : "bg-[#503936]/10 text-[#503936]"
                      }`}
                    >
                      {snake.category === "venomous"
                        ? "Venomous"
                        : "Non‑venomous"}
                    </span>
                    <button
                      type="button"
                      onClick={() => openEditModal(snake)}
                      className="rounded bg-[#352624] px-2 py-1 text-xs font-semibold text-white hover:bg-[#503936]"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => openDeleteModal(snake.id)}
                      className="rounded bg-[#352624] px-2 py-1 text-xs font-semibold text-white hover:bg-[#503936]"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Add/Edit modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="bg-gradient-to-r from-[#303030] to-[#494949] px-5 py-4 text-white">
              <h2 className="text-lg font-semibold">
                {editingId === null ? "Add snake" : "Edit snake"}
              </h2>
              <p className="mt-1 text-xs text-gray-300">
                Fill the fields below and click save.
              </p>
            </div>

            <form
              onSubmit={handleFormSubmit}
              className="space-y-3 px-5 py-4 text-sm"
            >
              <div className="space-y-1">
                <label className="block font-medium text-gray-800">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="King Cobra"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-[#503936] focus:ring-2 focus:ring-[#503936]"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-medium text-gray-800">
                  Scientific name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ophiophagus hannah"
                  value={scientificName}
                  onChange={(e) => setScientificName(e.target.value)}
                  className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-[#503936] focus:ring-2 focus:ring-[#503936]"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-medium text-gray-800">
                  Category
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      value="venomous"
                      checked={category === "venomous"}
                      onChange={() => setCategory("venomous")}
                    />
                    <span>Venomous</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      value="non-venomous"
                      checked={category === "non-venomous"}
                      onChange={() => setCategory("non-venomous")}
                    />
                    <span>Non‑venomous</span>
                  </label>
                </div>
              </div>

              {error && <p className="text-xs text-red-600">{error}</p>}

              <div className="mt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 rounded bg-[#352624] px-4 py-2 text-xs font-semibold text-white hover:bg-[#503936]"
                >
                  {editingId === null ? "Add" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={closeFormModal}
                  className="flex-1 rounded bg-gray-200 px-4 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="bg-gradient-to-r from-[#303030] to-[#494949] px-5 py-4 text-white">
              <h2 className="text-lg font-semibold">Delete snake</h2>
            </div>
            <div className="space-y-3 px-5 py-4 text-sm">
              <p className="text-gray-700">
                Are you sure you want to delete this snake? This action cannot
                be undone.
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex-1 rounded bg-[#352624] px-4 py-2 text-xs font-semibold text-white hover:bg-[#503936]"
                >
                  Yes, delete
                </button>
                <button
                  type="button"
                  onClick={closeDeleteModal}
                  className="flex-1 rounded bg-gray-200 px-4 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
