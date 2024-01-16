import { Input, Select } from "antd";
import { useState } from "react";
import React from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string
}

interface SearchPanelProps {
  users: User[],
  param: {
    name: string,
    personId: string
  },
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {

    console.log('param', param)
  return (
    <form action="">
      <div>
        {/* setParam(Object.assign({}, param, {name: e.target.value})) */}
        <Input
          type="text"
            value={param.name}
            onChange={(e) =>
              setParam({
                ...param,
                name: e.target.value,
              })
            }
        />

        <Select
          value={param.personId}
          onChange={value => {
            setParam({
              ...param,
              personId: value,
            });
          }}
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>
          ))}
        </Select>
      </div>
    </form>
  );
};
