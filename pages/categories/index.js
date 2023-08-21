import { DeleteSVG, EditSVG } from '@/components/Icons';
import Layout from '@/components/Layout';
import axios from 'axios';
import React, { useState } from 'react';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import useSWR from 'swr';

const CategoriesPage = () => {
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [editedCategory, setEditedCategory] = useState(null);
  const [properties, setProperties] = useState([]);

  const { data: categories, mutate } = useSWR('/api/categories');

  const saveCategory = async e => {
    e.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map(p => ({
        name: p.name,
        values: p.values.split(','),
      })),
    };
    if (editedCategory) {
      const updatedCategorie = await axios.put('api/categories', {
        ...data,
        _id: editedCategory._id,
      });

      const filteredCategories = categories.filter(
        categorie => categorie._id !== updatedCategorie._id
      );

      mutate([...filteredCategories, updatedCategorie]);

      setEditedCategory(null);
    } else {
      await axios.post('api/categories', data);
      mutate([...categories, data], { revalidate: false });
    }
    setName('');
    setParentCategory('');
    setProperties([]);
  };

  const editCategory = categorie => {
    setEditedCategory(categorie);
    setName(categorie.name);
    setParentCategory(categorie.parent?._id);
    setProperties(
      categorie.properties.map(({ name, values }) => ({
        name,
        values: values.join(','),
      }))
    );
  };

  const deleteCategory = categorie => {
    Confirm.init({
      titleColor: 'rgb(30 58 138)',
      okButtonBackground: 'rgb(30 58 138)',
    });
    Confirm.show(
      'Deleting category',
      `Delete category "${categorie.name}"?`,
      'Yes',
      'No',
      async () => {
        await axios.delete(`/api/categories?id=${categorie._id}`);
        //getCategories();
        mutate(
          categories.filter(
            curr_category => categorie._id !== curr_category._id
          ),
          { revalidate: false }
        );
      }
    );
  };

  const addProperty = () => {
    setProperties(prev => {
      return [...prev, { name: '', values: '' }];
    });
  };

  const handlePropertyNameChange = (index, newName) => {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };

  const handlePropertyValuesChange = (index, newValues) => {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  };

  const removeProperty = indexToRemove => {
    setProperties(prev => {
      return [...prev].filter((_, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category: ${editedCategory.name}`
          : 'Create new category'}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder={'Category name'}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <select
            value={parentCategory}
            onChange={e => setParentCategory(e.target.value)}
          >
            <option value="">No parent category</option>
            {categories &&
              categories.length > 0 &&
              categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            type="button"
            className="btn-default text-sm mb-1"
            onClick={addProperty}
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div key={index} className="flex gap-1 mb-2">
                <input
                  type="text"
                  placeholder="property name (example: color)"
                  className="mb-0"
                  value={property.name}
                  onChange={e =>
                    handlePropertyNameChange(index, e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="values, comma separated"
                  className="mb-0"
                  value={property.values}
                  onChange={e =>
                    handlePropertyValuesChange(index, e.target.value)
                  }
                />
                <button
                  type="button"
                  className="btn-red"
                  onClick={() => removeProperty(index)}
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-2">
          {editedCategory && (
            <button
              type="button"
              className="btn-default "
              onClick={() => {
                setEditedCategory(null);
                setName('');
                setParentCategory('');
                setProperties([]);
              }}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-primary py-1">
            Save
          </button>
        </div>
      </form>
      {!editedCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <th>Category name</th>
              <th>Parent category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.length > 0 &&
              categories.map(category => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn-default mr-1"
                      onClick={() => editCategory(category)}
                    >
                      <EditSVG h={6} />
                      Edit
                    </button>
                    <button
                      className="btn-red"
                      onClick={() => deleteCategory(category)}
                    >
                      <DeleteSVG h={6} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default CategoriesPage;
