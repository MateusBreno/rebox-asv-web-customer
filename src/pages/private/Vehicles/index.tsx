// ./src/pages/privates/Vehicles/index.tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

import {
  HeaderNavigationPrivate,
  MenuSideBarPrivate,
  SubtitleSecondary,
  ListVehicles,
  ButtonDefault,
  InputText,
} from '@components/index';
import { ConfigStorage, ConfigRules } from '@config/index';
import User from '@models/User';
import { apiRebox, sessionStorageService } from '@services/index';
import { toastify } from '@utils/notifiers';

import { IResponseVehicles } from './typing';

import {
  Container,
  ContainerGroup,
  Content,
  FormPage,
  Pagination,
  PaginationGroup,
  PaginationGroupText,
} from './styles';

const Vehicles: React.FC = () => {
  const formPageRef = useRef<FormHandles>(null);

  const [user] = useState<User | null>(sessionStorageService.getUser());
  const [vehicles, setVehicles] = useState<IResponseVehicles>();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(
    Number.parseInt(
      sessionStorage.getItem(
        ConfigStorage.REBOX_PAGINATION_VEHICLES_LIST_PAGE,
      ) || '1',
      10,
    ),
  );
  const [totalPages, setTotalPages] = useState<number>(1);

  const getVehicles = useCallback(
    async (desiredPage = 1) => {
      try {
        setLoading(prevState => !prevState);
        if (!user)
          throw new Error('Oops! Não foi possível buscar seus veículos.');

        let url = `/users/vehicles?page=${desiredPage}`;
        url += `&per_page=${ConfigRules.rebox.pagination.vehicles.itemLimit}`;
        url += `&users_id=${user?.id}`;
        const { data: response } = await apiRebox.get(url);
        setVehicles(response);
        const { total, per_page } = response.header;
        setTotalPages(Math.ceil(total / per_page));
        formPageRef.current?.setData({ currentPage: desiredPage });
      } catch (error: any) {
        if (error.message) toastify(error.message, 'error');
        console.error('Houve um error ao buscar veículos do cliente.', error);
      } finally {
        setLoading(prevState => !prevState);
      }
    },
    [user],
  );

  useEffect(() => {
    getVehicles();
  }, [refresh]);

  return (
    <Container>
      <HeaderNavigationPrivate />
      <ContainerGroup>
        <MenuSideBarPrivate />
        <Content>
          <SubtitleSecondary textAlign="start">Meus veículos</SubtitleSecondary>
          <ListVehicles
            vehicles={vehicles?.data}
            loading={loading}
            showTotal={true}
            totalValue={vehicles?.header.total}
          />
          <Pagination>
            <ButtonDefault
              style={{
                borderRadius: '8px 0 0 8px',
                maxWidth: 100,
              }}
              disabled={page === 1}
              isDisable={page === 1}
              onClick={() => setPage(1)}
            >
              Primeira
            </ButtonDefault>
            <ButtonDefault
              iconLeft={IoChevronBack}
              style={{
                borderRadius: '0',
                maxWidth: 30,
                padding: '0 5px',
                margin: '0 5px',
              }}
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            />
            <PaginationGroup>
              <FormPage
                ref={formPageRef}
                onSubmit={() => console.log('')}
                initialData={{ currentPage: page }}
              >
                <InputText
                  name="currentPage"
                  type="number"
                  min="1"
                  onChange={event => {
                    if (!(event.target.value === '')) {
                      setPage(Number.parseInt(event.target.value, 10));
                    }
                  }}
                />
              </FormPage>
              <PaginationGroupText>de {totalPages}</PaginationGroupText>
            </PaginationGroup>

            <ButtonDefault
              iconLeft={IoChevronForward}
              style={{
                borderRadius: '0',
                maxWidth: 30,
                padding: '0 5px',
                margin: '0 5px',
              }}
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            />
            <ButtonDefault
              style={{
                borderRadius: '0 8px 8px 0',
                maxWidth: 100,
              }}
              disabled={page === totalPages}
              isDisable={page === totalPages}
              onClick={() => setPage(totalPages)}
            >
              Última
            </ButtonDefault>
          </Pagination>
        </Content>
      </ContainerGroup>
    </Container>
  );
};

export default Vehicles;
